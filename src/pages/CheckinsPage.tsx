import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
// import { getCheckins } from "@/http/api";
import { capitalize } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
import CreateCheckins from "./CreateCheckins";

const CheckinsPage = () => {
  // todo: add loading spinner, and error message

  // const { data } = useQuery({
  //   queryKey: ["checkin"],
  //   queryFn: getCheckins,
  //   staleTime: 10000, // in Milli-seconds
  // });

  //  const newData = JSON.parse(data);
  //  console.log("checkin page",newData);

  const dummyData = {
    customerName: "John Doe",
    offeringName: "Premium Support Plan",
    deliveryName: "On-Site Installation",
    currentRelMargin: "25%",
    currentAbsMargin: "$5000",
    currentConfidenceLevel: "High",
  };
  const {
    customerName,
    offeringName,
    deliveryName,
    currentRelMargin,
    currentAbsMargin,
    currentConfidenceLevel,
  } = dummyData;

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
      <TableCell>{capitalize(customerName)}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Offering Name</TableCell>
      <TableCell>{offeringName}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Delivery Name</TableCell>
      <TableCell>{deliveryName}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current rel. Margin</TableCell>
      <TableCell>{currentRelMargin}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current abs. Margin</TableCell>
      <TableCell>{currentAbsMargin}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Current Confidence Level</TableCell>
      <TableCell>{currentConfidenceLevel}</TableCell>
    </TableRow>
  </TableBody>
</Table>
        </CardContent>
        <hr style={{margin:'10px 0px 40px 0px'}}/>
        <>
        <CreateCheckins/>
        </>
      </Card>
    </div>
  );
};

export default CheckinsPage;
