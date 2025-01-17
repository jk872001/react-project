import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { CheckinsFormSchema } from "@/lib/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckins } from "@/http/api";
import { useToast } from "@/hooks/use-toast";

const CreateCheckins = ({ guid }: { guid: string }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CheckinsFormSchema>>({
    resolver: zodResolver(CheckinsFormSchema),
    defaultValues: {
      effort: "",
      cost: "",
      confidence: "",
      comment: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formdata: FormData) => createCheckins(formdata, guid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkins", guid] });
      toast({
        title: "Form saved",
        description: "",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    },
  });

  // const { data } = useQuery({
  //   queryKey: ["checkin", guid],
  //   queryFn: () => getCheckins(guid),
  //   staleTime: 10000, // in Milli-seconds
  //   enabled: !!guid,
  // });
  // console.log(data, "data create");

  function onSubmit(values: z.infer<typeof CheckinsFormSchema>) {
    const formdata = new FormData();

    formdata.append("effort", values.effort);
    formdata.append("cost", values.cost);
    formdata.append("confidence", values.confidence);
    formdata.append("comment", values.comment);

    if (!guid) {
      toast({
        title: "Error",
        description: "GUID is required to submit the form.",
      });
      return;
    }

    mutation.mutate(formdata);
  }

  return (
    <section className="w-3/4 p-8">
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 items-between">
            <div className="flex gap-4 w-full">
              {/* Effort Field */}
              <FormField
                control={form.control}
                name="effort"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Effort</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Cost Field */}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 w-full">
              {/* confidence Field */}
              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Confidence</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Input type="text" className="w-full" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 my-6">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              <span className="ml-2">Submit</span>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateCheckins;
