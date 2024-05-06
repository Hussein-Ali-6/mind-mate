"use client";

import { createCourse } from "@/actions/course";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function DialogCreateCourse() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <SquarePlus className="size-4" />
          <span className="hidden md:inline-block">Create new</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new course</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription> */}
        </DialogHeader>
        <form
          action={async (formData) => {
            const res = await createCourse(formData);
            if (res) setOpen(false);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                autoFocus
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <CreateButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  );
}
