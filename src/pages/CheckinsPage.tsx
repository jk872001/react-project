import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { getCheckins } from "@/http/api";
import { capitalize } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import CreateCheckins from "./CreateCheckins";
import { useLocation } from "react-router-dom";

const CheckinsPage = () => {
  
  // const ID: string ="d5bc6480-2e3c-435e-734e-577cca22a263";
  const location= useLocation();
  const guid = location.pathname.split("/").pop()
  // const { guid } = useParams<{ guid: string }>(); // Retrieve the `id`
  // console.log(guid,"pathname");
  
  const { data } = useQuery({
    queryKey: ["checkin",guid],
    queryFn: () => getCheckins(guid),
    staleTime: 10000, // in Milli-seconds
    enabled: !!guid,
  });

  
  //  console.log("idd",guid,"checkin page",data);


  return (
    <div>
      <Toaster />

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Weekly Checkin From</CardTitle>
            
          </div>
        </CardHeader>
        <CardContent>
        <Table>

  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Customer Name</TableCell>
      <TableCell>{capitalize(data?.customer?.name)}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Offering Name</TableCell>
      <TableCell>{data?.offering?.name}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Delivery Name</TableCell>
      <TableCell>{data?.delivery?.name}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current rel. Margin</TableCell>
      <TableCell>{data?.current_margin_rel}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current abs. Margin</TableCell>
      <TableCell>{data?.current_margin_abs}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current Confidence Level</TableCell>
      <TableCell>{data?.delivery?.current_confidence}</TableCell>
    </TableRow>
  </TableBody>
</Table>
        </CardContent>
        <hr style={{margin:'10px 0px 40px 0px'}}/>
        <>
        <CreateCheckins guid={guid}/>
        </>
      </Card>
    </div>
  );
};

export default CheckinsPage;
