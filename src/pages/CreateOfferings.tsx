import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { createOffering } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { OfferingFormSchema } from '@/lib/zod';



const CreateOfferings = () => {
    const navigate = useNavigate();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof OfferingFormSchema>>({
        resolver: zodResolver(OfferingFormSchema),
        defaultValues: {
            name: '',
            defaultPrice: '',
            defaultCost: '',
            defaultEffort: '',
            defaultDuration: '',
            isRecurring: "0",
        },
    });

   
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createOffering,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["offerings"] });
          console.log("Offering created successfully");
          navigate("/dashboard/offerings");
        },
        onError: (error: any) => {
            
          if (error.response?.status === 500) {
            console.log("error")
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
          }
        },
      });

    function onSubmit(values: z.infer<typeof OfferingFormSchema>) {
        const formdata = new FormData();
        formdata.append('name', values.name);
        formdata.append('defaultPrice', values.defaultPrice);
        formdata.append('defaultCost', values.defaultCost);
        formdata.append('defaultEffort', values.defaultEffort);
        formdata.append('defaultDuration', values.defaultDuration);
        formdata.append('isRecurring', values.isRecurring);

        mutation.mutate(formdata);

        console.log(values);
    }

    return (
        <section className='w-3/4'>
            <Toaster/>
            <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader>
                <CardTitle>Create a New Offering</CardTitle>
                <CardDescription>
                    Fill out the form below to create a new offering.
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

                    {/* Default Price and Default Cost */}
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="defaultPrice"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Default Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultCost"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Default Cost</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Default Effort and Default Duration */}
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="defaultEffort"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Default Effort</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultDuration"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Default Duration</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Is Recurring Field */}
                    <FormField
                        control={form.control}
                        name="isRecurring"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Is Recurring</FormLabel>
                                <FormControl>
                                    <select
                                        className="w-full border rounded p-2"
                                        {...field}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>

            <div className="flex items-center gap-4 my-3 mx-5">
                <Link to="/dashboard/offerings">
                    <Button variant={'outline'}>
                        <span className="ml-2">Cancel</span>
                    </Button>
                </Link>
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending && <LoaderCircle className="animate-spin" />}
                    <span className="ml-2">Submit</span>
                </Button>
            </div>
        </Card>
    </form>
</Form>


        </section>
    );
};

export default CreateOfferings;
