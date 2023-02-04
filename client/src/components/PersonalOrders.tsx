import moment from "moment";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllUserOrders } from "../queries";
import FetchingState from "../utils/fetchingState";
import { Order } from "../utils/types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


 interface OrderRowProps {
  order: Order;
 }

const OrderRow: React.FC<OrderRowProps> = ({order}) => {
  const [open, setOpen] = useState(false);
  const {_id, address, totalPrice, createdAt, items} = order;

  return (
    <><TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {moment(createdAt).format('DD.MM.YYYY')}
      </TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{totalPrice.toString()}</TableCell>
    </TableRow><TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>price (₪)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(({item,size,quantity}) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                      <img style={{height: "20vh", width:"20vh"}} alt ='' src={item.image}/>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{size.description}</TableCell>
                      <TableCell>
                        {quantity.toString()}
                      </TableCell>
                      <TableCell>
                        {item.price.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow></>
  )
} 

const PersonalOrders: React.FC = () => {
  const { 
  data: orders = [],
  isLoading,
  isError,
  isSuccess} = useQuery<Order[]>('userOrders',getAllUserOrders);

    return (
    <FetchingState isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
      <h1>My Orders</h1>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Date</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total price (₪)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </FetchingState>)
}

export default PersonalOrders
