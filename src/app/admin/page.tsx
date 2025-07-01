"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddContact } from "@/components/contact/add";
import { DeleteContact } from "@/components/contact/delete";
import { EditContact } from "@/components/contact/edit";
import { AddCredit } from "@/components/credit/add";
import { DeleteCredit } from "@/components/credit/delete";
import { EditCredit } from "@/components/credit/edit";
import { SaveOther } from "@/components/other/save";
import { AddProject } from "@/components/project/add";
import { DeleteProject } from "@/components/project/delete";
import { EditProject } from "@/components/project/edit";
import { AddTitle } from "@/components/title/add";
import { DeleteTitle } from "@/components/title/delete";
import { EditTitle } from "@/components/title/edit";
import { LogOut } from "lucide-react";
import { iconStyle } from "@/styles/styles";
import emailjs from "@emailjs/browser";

export default function AdminPortal() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { data: other } = api.other.find.useQuery();

  useEffect(() => {
    const isAuthed = localStorage.getItem("admin_authed");
    if (isAuthed === "true") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    if (other?.password === passwordInput) {
      setAuthed(true);
      localStorage.setItem("admin_authed", "true");
      setPasswordInput("");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    localStorage.removeItem("admin_authed");
  };

  const handleForgot = () => {
    emailjs
      .send(
        "elox_pro",
        "template_i7n355h",
        {
          from_name: "Portfolio",
          to_name: "Eloi",
          from_email: "",
          to_email: "iradeloi41@gmail.com",
          from_phone: "",
          message: `Password is ${other?.password} are you normal?🤫`,
        },
        "LA35jViYUIgiv9AR5",
      )
      .then(
        () => {
          toast.success(
            "Sent Password to your Email.",
          );
        },
        (error) => {
          console.error(error);
          toast.error("Ahh, something went wrong. Please try again.");
        },
      );
  };

  if (!authed) {
    return (
      <div className="flex w-[70%] h-screen flex-col items-center justify-center">
        <div className="w-full max-w-sm space-y-4 border p-6 text-center">
          <h1 className="text-xl font-bold">Enter Admin Password</h1>
          <div className="flex items-center gap-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <Button
              variant="ghost"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
          <Button onClick={handleLogin} className="w-full">
            Enter
          </Button>
          <Button
            variant="link"
            className="text-xs text-muted-foreground"
            onClick={handleForgot}
          >
            Forgot password?
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[65%] h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-2 border border-primary p-4">
        <div className="flex w-full items-center justify-center gap-1">
          <h1 className="w-4/5 border-b border-inherit text-center text-xl font-bold">
            My Portal
          </h1>
          <button className={`${iconStyle}`} onClick={handleLogout}>
            <LogOut />
          </button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="title">Titles</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-2" value="projects">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="add">Add</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="add"
              >
                <AddProject />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="edit"
              >
                <EditProject />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="delete"
              >
                <DeleteProject />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent className="space-y-4" value="contact">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="add">Add</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="add"
              >
                <AddContact />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="edit"
              >
                <EditContact />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="delete"
              >
                <DeleteContact />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent className="space-y-4" value="credits">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="add">Add</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="add"
              >
                <AddCredit />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="edit"
              >
                <EditCredit />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="delete"
              >
                <DeleteCredit />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent className="space-y-4" value="title">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="add">Add</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="add"
              >
                <AddTitle />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="edit"
              >
                <EditTitle />
              </TabsContent>
              <TabsContent
                className="h-64 overflow-y-scroll scrollbar-hide"
                value="delete"
              >
                <DeleteTitle />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent
            className="h-64 overflow-y-scroll scrollbar-hide"
            value="other"
          >
            <SaveOther />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
