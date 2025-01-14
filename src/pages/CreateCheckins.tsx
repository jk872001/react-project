import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
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
// import { LoaderCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { DeliveryFormSchema } from "@/lib/zod";

const CreateCheckins = () => {
//   const { toast } = useToast();

  const form = useForm<z.infer<typeof DeliveryFormSchema>>({
    resolver: zodResolver(DeliveryFormSchema),
    defaultValues: {
      name: "",
      customerId: "",
      offeringId: "",
      planStartDate: "",
      planEndDate: "",
      price: "",
    },
  });

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createDelivery,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["deliveries"] });
//       navigate("/dashboard/checkins");
//     },
//     onError: (error: any) => {
//       if (error.response?.status === 500) {
//         toast({
//           title: "Uh oh! Something went wrong.",
//           description: "There was a problem with your request.",
//         });
//       }
//     },
//   });

  //   const { data: customerData } = useQuery({
  //     queryKey: ["customers"],
  //     queryFn: getCustomers,
  //     staleTime: 10000,
  //   });

  //   const { data: offeringData } = useQuery({
  //     queryKey: ["offerings"],
  //     queryFn: getOfferings,
  //     staleTime: 10000,
  //   });

  //   function onSubmit(values: z.infer<typeof DeliveryFormSchema>) {
  //     const formdata = new FormData();
  //     formdata.append("name", values.name);
  //     formdata.append("customerId", values.customerId);
  //     formdata.append("offeringId", values.offeringId);
  //     formdata.append("planStartDate", values.planStartDate);
  //     formdata.append("planEndDate", values.planEndDate);
  //     formdata.append("price", values.price);

  //     mutation.mutate(formdata);
  //   }

  return (
    <section className="w-3/4 p-8">
      <Toaster />
      <Form {...form}>
        <form
        // onSubmit={form.handleSubmit(onSubmit)}
        >
              <div className="grid gap-6 items-between">

              <div className="flex gap-4 w-full">
                {/* Name Field */}
                <FormField
                  //   control={form.control}
                  name="effort"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Effort</FormLabel>
                      <FormControl>
                        <Input type="text"  className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* Cost Field */}
                 <FormField
                    //   control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input type="number"  className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                 

                  {/* confidence Field */}
                  <FormField
                    //   control={form.control}
                    name="confidence"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Confidence</FormLabel>
                        <FormControl>
                          <Input type="text"  className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    //   control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Input type="text"  className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


               
              </div>

            <div className="flex items-center gap-4 my-6">
              <Button type="submit" 
            //   disabled={mutation.isPending}
              >
                {/* {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )} */}
                <span className="ml-2">Submit</span>
              </Button>
            </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateCheckins;
