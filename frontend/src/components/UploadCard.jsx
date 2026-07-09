import { useState, useRef } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { socket } from "@/socket/socket";

export default function UploadCard({ setJob }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/uploads", formData);
      // console.log("UPLOAD RESPONSE:", res.data);
      const job = res.data;

      setJob(res.data);
      socket.emit("join-job", job.id);
      setMessage("✅ File uploaded successfully!");
      setFile(null);
      inputRef.current.value = "";
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>File Processo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          ref={inputRef}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <p className="text-sm text-gray-500">
            Selected: <strong>{file.name}</strong>
          </p>
        )}
        <Button
          className="w-full"
          disabled={!file || loading}
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>

        {message && <p className="text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
