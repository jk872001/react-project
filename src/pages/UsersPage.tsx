import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/http/api";
import { capitalize, formatCreatedAt } from "@/lib/utils";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const UsersPage = () => {
  // todo: add loading spinner, and error message
  // @ts-ignore

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 10000, // in Milli-seconds
  });

  console.log(data);

  return (
    <div>
      <div className="flex items-center justify-end">
        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
       
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between">
            <CardTitle>Users</CardTitle>
          <Link to="/dashboard/users/create">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add User</span>
          </Button>
        </Link>
            </div>
          
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Org. Id</TableHead>
                <TableHead>Created At</TableHead>
                {/* <TableHead className="hidden md:table-cell">Author name</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead> */}
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((user: User) => {
                return (
                  <TableRow key={user._id}>
                    {/* <TableCell className="hidden sm:table-cell">
                                            <img
                                                alt={user.title}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={user.coverImage}
                                                width="64"
                                            />
                                        </TableCell> */}
                    <TableCell className="font-medium">
                      {capitalize(user.name)}
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">{user.org_id}</TableCell>
                    <TableCell className="font-medium">
                      {formatCreatedAt(user.created_at)}
                    </TableCell>

                    {/* <TableCell className="hidden md:table-cell">
                                            {book.author.name}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {book.createdAt}
                                        </TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                    </div>
                </CardFooter> */}
      </Card>
    </div>
  );
};

export default UsersPage;
