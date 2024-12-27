"use client";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { setScore } from "@/leaderboards/setScore";
import {
  PlayersDialogType,
  AddPlayersModalProps,
  LayoutContextType,
} from "@/types";
import { LayoutContext } from "@/app/layout";

export default function AddPlayersModal({
  isOpen,
  onClose,
  title,
  isRefetchPlayers,
  setIsRefetchPlayers,
}: AddPlayersModalProps) {
  const { toast } = useToast();

  const { label } = useContext<LayoutContextType>(
    LayoutContext as React.Context<LayoutContextType>
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PlayersDialogType>({
    defaultValues: {
      players: "",
      scores: 0,
    },
  });

  async function onSubmit(values: PlayersDialogType) {
    setIsLoading(true);
    const response = await setScore({
      deployment: "dev",
      label: label,
      title: title,
      players: values.players,
      scores: values.scores,
    });

    if (response.status === "mined") {
      toast({
        title: "New Player added successfully",
        description: "New Player has been added successfully",
      });
      setIsRefetchPlayers(!isRefetchPlayers);
      onClose();
    } else {
      toast({
        title: "New Player addition failed",
        description: "Please try again",
      });
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Players</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="players"
                rules={{ required: "Players are required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Players</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scores"
                rules={{ required: "Scores are required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scores</FormLabel>
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
                  "Add New Player"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
