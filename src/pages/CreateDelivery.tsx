import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
import { createDelivery } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { DeliveryFormSchema } from "@/lib/zod";

const CreateDelivery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      console.log("Delivery created successfully");
      navigate("/dashboard/delivery");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        console.log("error");
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof DeliveryFormSchema>) {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("customerId", values.customerId);
    formdata.append("offeringId", values.offeringId);
    formdata.append("planStartDate", values.planStartDate);
    formdata.append("planEndDate", values.planEndDate);
    formdata.append("price", values.price);

    mutation.mutate(formdata);
  }

  return (
    <section className="w-3/4">
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="">
            <CardHeader>
              <CardTitle>Create a New Delivery</CardTitle>
              <CardDescription>
                Fill out the form below to create a new delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  {/* Customer ID Field */}
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Customer ID</FormLabel>
                        <FormControl>
                          <Input type="number" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Offering ID Field */}
                  <FormField
                    control={form.control}
                    name="offeringId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Offering ID</FormLabel>
                        <FormControl>
                          <Input type="number" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  {/* Plan Start Date Field */}
                  <FormField
                    control={form.control}
                    name="planStartDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Plan Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Plan End Date Field */}
                  <FormField
                    control={form.control}
                    name="planEndDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Plan End Date</FormLabel>
                        <FormControl>
                          <Input type="date" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Price Field */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <div className="flex items-center gap-4 my-3 mx-5">
              <Link to="/dashboard/delivery">
                <Button variant="outline">
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                <span className="ml-2">Submit</span>
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default CreateDelivery;
