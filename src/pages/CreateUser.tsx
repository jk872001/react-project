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
import { createUser } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
    name: z.string().min(1, "Name is required"), // Ensures name is a non-empty string
  email: z.string().email("Invalid email format") ,// Validates email format
});

const CreateUser = () => {
    const navigate = useNavigate();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    // const coverImageRef = form.register('coverImage');
    // const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          console.log("User created successfully");
          navigate("/dashboard/users");
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formdata = new FormData();
        formdata.append('name', values.name);
        formdata.append('email', values.email);

        mutation.mutate(formdata);

        // console.log(values);
    }

    return (
        <section className='w-3/4'>
            <Toaster/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                   
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Create a new user</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new user.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
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

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea className="min-h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                {/* <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...coverImageRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                {/* <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Book File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...fileRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                            </div>
                        </CardContent>
                        
                       
                       <div className="flex items-center gap-4 my-3 mx-5">
                           <Link to="/dashboard/users">
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

export default CreateUser;
