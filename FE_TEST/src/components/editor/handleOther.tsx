import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { useDeleteComment, useUpdateComment } from "../../lib/api/comment";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface HandleProps {
  id: number;
  content?: string;
}

export function HandleOther({ id, content }: HandleProps) {
  const deletes = useDeleteComment(id);
  const update = useUpdateComment(id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(content || "");

  const handleDelete = async () => {
    deletes.mutate();
  };

  const handleEdit = () => {
    update.mutate(editContent);
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="hover:bg-gray-100 rounded-full p-1">
            <MoreHorizontal className="text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setEditContent(content || "");
              setIsDialogOpen(true);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit your comment..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="px-4">
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              disabled={!editContent.trim() || update.isPending}
              className="px-4">
              {update.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
