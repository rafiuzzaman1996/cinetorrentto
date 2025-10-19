'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB

const Gallery = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
  };
  // Simulated API endpoints
  const API = {
    getImages: async () => {
      // Simulate fetching images from an API
      return Promise.resolve([
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
      ]);
    },
    uploadImages: async (files: File[]) => {
      // Simulate uploading images to an API
      return Promise.resolve(files.map((file) => URL.createObjectURL(file)));
    },
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await API.getImages();
      setImages(fetchedImages);
    };
    fetchImages();
  }, []);

  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    setError(null); // Clear previous errors
    const fileArray = files ? Array.from(files) : [];

    const validFiles: File[] = [];
    const previews: string[] = [];

    fileArray.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`File "${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
      } else if (!file.type.startsWith('image/')) {
        setError(`File "${file.name}" is not a valid image.`);
      } else {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      }
    });

    setSelectedFiles(validFiles);
    setPreviews(previews);
  };

  // Handle drag-and-drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const uploadedImageUrls = await API.uploadImages(selectedFiles);
      setImages((prev) => [...prev, ...uploadedImageUrls]);
      setSelectedFiles([]); // Clear the selected files
      setPreviews([]); // Clear the previews
    }
    setDialogOpen(false); // Close the dialog
  };

  // Trigger file input click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold">Gallery</h1>

      {/* Dialog for Upload */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <div className="flex justify-end">
          <Button variant="outline" size="lg" className="w-5/12 md:w-3/12 cursor-pointer">Upload Images</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-8/12 w-full h-[80vh] p-4 flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
            {/* Drag-and-Drop Area */}
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-gray-500"
            >
              <p className="text-gray-500">Drag & drop images here, or click to select files</p>
              <p className="text-sm text-gray-400">Maximum file size: {MAX_FILE_SIZE_MB} MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Previews */}
            <div className="grid grid-cols-4 gap-2">
              {previews.map((src, index) => (
                <div key={index} className="flex flex-row flex-wrap ">
                  <div className="relative w-20 h-20 flex flex-col items-center">
                    <Image
                      src={src}
                      alt={`Preview ${index}`}
                      className="rounded-md object-cover"
                      fill
                    />
                  </div>
                  <div className="mt-1 w-full">
                    <p className="text-xs text-gray-500 truncate" title={selectedFiles[index].name}>
                      {selectedFiles[index].name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(selectedFiles[index].size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <Card key={index} className="p-0 overflow-hidden">
            <Image
              src={src}
              alt={`Uploaded ${index}`}
              className="w-full h-50"
              loading='lazy'
              sizes='(width: 600px) 600px, (width: 1200px) 50vw, 33vw'
              width={600}
              height={400}
              style={{ objectFit: 'cover', width: '100%', height: '250px' }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;