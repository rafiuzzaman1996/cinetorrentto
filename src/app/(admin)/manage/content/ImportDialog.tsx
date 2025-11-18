'use client'

import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spreadsheet from "react-spreadsheet";
import * as XLSX from "xlsx";
import { useTheme } from "next-themes";
import { importContents } from "../../admin-api/ContentApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SheetData {
    value: string; readOnly?: boolean
}
export function ImportDialog() {
    const router = useRouter();
    const { theme } = useTheme();
    const [open, onOpenChange] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [sheetData, setSheetData] = React.useState<SheetData[][] | null>(null);
    const [showPreview, setShowPreview] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    function isAccepted(f: File) {
        const allowedTypes = [
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];
        const allowedExt = [".csv", ".xls", ".xlsx"];
        const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
        return (
            allowedTypes.includes(f.type) ||
            allowedExt.includes(ext)
        );
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (f && isAccepted(f)) {
            setFile(f);
            setShowPreview(false);
            setSheetData(null);
        } else {
            setFile(null);
            setSheetData(null);
            setShowPreview(false);
        }
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        const f = e.dataTransfer.files?.[0];
        if (f && isAccepted(f)) {
            setFile(f);
            setShowPreview(false);
            setSheetData(null);
        }
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleShowPreview() {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let data: SheetData[][] = [];
                if (file.name.endsWith(".csv")) {
                    const text = e.target?.result as string;
                    const rows = text.split("\n").slice(0, 10).map(row => row.split(","));
                    data = rows.map(row => row.map(cell => ({ value: cell })));
                } else {
                    const arr = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(arr, { type: "array" });
                    const wsname = workbook.SheetNames[0];
                    const ws = workbook.Sheets[wsname];
                    const json = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, skipHidden: true }) as SheetData[][];

                    // data = json.slice(0, 10).map(row => row.map(cell => ({ value: cell })));
                    data = json.map(row =>
                        row.map(cell => ({
                            value: cell !== undefined && cell !== null ? String(cell) : "",
                            readOnly: true
                        }))
                    );
                }
                setSheetData(data);
                setShowPreview(true);
            };
            if (file.name.endsWith(".csv")) {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        }
    }

    function handleHidePreview() {
        setShowPreview(false);
    }

    async function handleImport() {
        if (file) {
            try {

                const result = await importContents(file);

                if (!result) {
                    toast.error("Import failed");
                    return;
                }
                router.refresh();
                toast.success("Import initiated successfully");
                setFile(null);
                setSheetData(null);
                setShowPreview(false);
                onOpenChange(false);
            } catch (error) {
                toast.error(String(error));
            }
        } else {
            toast.error("No file selected");
            console.error("No file selected");
        }

    }

    function handleClose() {
        setFile(null);
        setSheetData(null);
        setShowPreview(false);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Import</Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="sm:max-w-10/12 w-full h-[90vh] p-4 overflow-auto">
                <DialogHeader>
                    <DialogTitle>Import File</DialogTitle>
                </DialogHeader>
                <div
                    className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors"
                    style={{ borderColor: "#d1d5db" }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <p>
                        Drag & drop an Excel or CSV file here, or <span className="underline">click to select</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Accepted: .csv, .xls, .xlsx</p>
                </div>
                {file && (
                    <div className="my-2">
                        <div className="font-medium">Selected file: {file.name}</div>
                        {!showPreview ? (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-2"
                                onClick={handleShowPreview}
                            >
                                Show Preview
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-2"
                                onClick={handleHidePreview}
                            >
                                Hide Preview
                            </Button>
                        )}
                        {showPreview && sheetData && (
                            <div className="rounded p-2 mt-2 max-h-60 overflow-auto text-xs text-left">
                                <Spreadsheet className="max-w-1" data={sheetData} darkMode={theme === "dark"} />
                            </div>
                        )}
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleImport} disabled={!file}>
                        Import
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}