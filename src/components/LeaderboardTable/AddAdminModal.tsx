"use client";

import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AdminDialogType } from "@/types";
import { addAdmin } from "@/leaderboards/addAdmin";
import { useToast } from "@/hooks/use-toast";
import { AddAdminModalProps, LayoutContextType } from "@/types";
import { LayoutContext } from "@/app/layout";

export default function AddAdminModal({
  isOpen,
  onClose,
  isRefetchAdmin,
  setIsRefetchAdmin,
}: AddAdminModalProps) {
  const { toast } = useToast();

  const { label } = useContext<LayoutContextType>(
    LayoutContext as React.Context<LayoutContextType>
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<AdminDialogType>({
    defaultValues: {
      newAdmin: "",
    },
  });

  async function onSubmit(values: AdminDialogType) {
    setIsLoading(true);
    const response = await addAdmin({
      deployment: "dev",
      label: label,
      newAdmin: values.newAdmin,
    });

    if (response.status === "mined") {
      toast({
        title: "New Admin added successfully",
        description: "New Admin has been added successfully",
      });
      setIsRefetchAdmin(!isRefetchAdmin);
      onClose();
    } else {
      toast({
        title: "New Admin addition failed",
        description: "Please try again",
      });
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="newAdmin"
                rules={{ required: "Admin Wallet Address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Wallet Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner
                    show={isLoading}
                    size="small"
                    className="text-white"
                  />
                ) : (
                  "Add New Admin"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
