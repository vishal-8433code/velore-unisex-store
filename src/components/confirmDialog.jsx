import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "../components/ui/button";

export const ConfirmDialog = ({ isOpen, onOpenChange, onConfirm, title, description }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white rounded-xl p-6 w-[400px] shadow-lg">
        {/* ✅ Required DialogTitle */}
        <DialogTitle className="text-lg font-bold">{title || "Confirm Action"}</DialogTitle>

        {/* ✅ Optional DialogDescription */}
        <DialogDescription className="mt-2 text-sm text-gray-300">
          {description || "Are you sure you want to perform this action?"}
        </DialogDescription>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
