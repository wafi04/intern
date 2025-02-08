import { Editor } from "./components/editor/editor";
import { Navbar } from "./components/layouts/Navbar";
import { LoadingOverlay } from "./components/ui/LoadingOverlay";
import { useGetComment } from "./lib/api/comment";
import { UserCircle2 } from "lucide-react";
import { FormatTime } from "./utils/firmatTIme";
import { HandleOther } from "./components/editor/handleOther";

function App() {
  const { data, isLoading } = useGetComment();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <Editor />
        </div>

        <div className="divide-y">
          {data?.map((comment) => (
            <div
              key={comment.id}
              className="p-4 hover:bg-gray-50 transition-colors relative group">
              <div className="flex space-x-3">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  {comment.user?.name ? (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">
                      {getInitials(comment.user.name)}
                    </div>
                  ) : (
                    <UserCircle2 className="w-10 h-10 text-gray-400" />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  {/* Header: Name and Time */}
                  <div className="flex items-center">
                    <div className="flex items-center flex-wrap">
                      <span className="font-bold text-gray-900 mr-1">
                        {comment.user?.name || "Anonymous"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        · {FormatTime(comment.createdAt)}
                      </span>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <HandleOther id={comment.id} content={comment.content} />
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="mt-1">
                    <p className="text-gray-900 whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  </div>

                  {/* Interaction Buttons - Optional */}
                  <div className="flex items-center mt-2 space-x-8">
                    <button className="flex items-center text-gray-500 hover:text-blue-500 text-sm group">
                      <svg
                        className="w-4 h-4 mr-2 group-hover:text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Reply
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-500 text-sm group">
                      <svg
                        className="w-4 h-4 mr-2 group-hover:text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Repost
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-red-500 text-sm group">
                      <svg
                        className="w-4 h-4 mr-2 group-hover:text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
