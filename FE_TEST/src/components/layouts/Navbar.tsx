import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <div className="sticky top-0 h-10 flex items-center justify-between px-10 bg-white dark:bg-gray-900 shadow-sm z-50">
      <Link to={"/"} className="text-xl font-bold text-black dark:text-white">
        Comment
      </Link>

      <div className="flex flex-row gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full px-3 hover:bg-transparent focus:bg-transparent">
              <User className="h-6 w-6 text-black dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-500 focus:bg-red-50 focus:text-red-500"
              onClick={() => {
                console.log("User logged out");
              }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
