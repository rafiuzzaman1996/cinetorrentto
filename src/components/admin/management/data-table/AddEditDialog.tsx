'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
export const AddEditDialog2 = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="ghost">
                HHHH
            </Button>
            ll- {open}


            <Dialog open={open} onOpenChange={setOpen}>
                <p>Hello</p>
            </Dialog>
        </>
    )
}
