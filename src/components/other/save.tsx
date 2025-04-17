"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { Eye, EyeOff } from "lucide-react";

export function SaveOther() {
  const utils = api.useUtils();
  const { data, isLoading } = api.other.find.useQuery();
  const saveOther = api.other.save.useMutation({
    onSuccess: (res) => {
      toast[res.result === "Saved" ? "success" : "error"](res.result);
      void utils.other.find.invalidate();
    },
  });

  const [resume, setResume] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (data) {
      setResume(data.resume);
    }
  }, [data]);

  const handleSave = () => {
    if (!data) {
      if (!newPassword) {
        toast.error("Set a password.");
        return;
      }
      saveOther.mutate({ resume, password: newPassword });
    } else {
      if (oldPassword !== data.password && newPassword) {
        toast.error("Old password is incorrect.");
        return;
      }
      const passwordToUse = newPassword || data.password;
      saveOther.mutate({ resume, password: passwordToUse });
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Input
        placeholder="Resume URL"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      {data && (
        <div className="relative">
          <Input
            placeholder="Old Password"
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowOld((prev) => !prev)}
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      )}

      <div className="relative">
        <Input
          placeholder={data ? "New Password (optional)" : "Set Password"}
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setShowNew((prev) => !prev)}
        >
          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button onClick={handleSave}>
        {data ? "Update Info" : "Save Info"}
      </Button>
    </div>
  );
}
