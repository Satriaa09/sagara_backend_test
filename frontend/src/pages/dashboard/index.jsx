// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateShirtDialog from "../update";

const Dashboard = () => {
  const [shirts, setShirts] = useState([]);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    fetch("http://localhost:5001/shirts")
      .then((response) => response.json())
      .then((data) => setShirts(data))
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5001/shirts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      // Update state dengan data yang baru
      setShirts((prevShirts) =>
        prevShirts.map((shirt) =>
          shirt.id === id ? { ...shirt, ...updatedData } : shirt
        )
      );
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/shirts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      // Hapus item dari state
      setShirts((prevShirts) =>
        prevShirts.filter((shirt) => shirt.id !== id)
      );
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "warna", headerName: "Warna", width: 200 },
    { field: "ukuran", headerName: "Ukuran", width: 200 },
    { field: "harga", headerName: "Harga", width: 200, type: "number" },
    { field: "stok", headerName: "Stok", width: 200, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <IconButton
            onClick={() => {
              setSelectedShirt(params.row);
              setOpenDialog(true);
            }}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "calc(100vh - 4rem)",
        width: "100%",
        padding: "2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <DataGrid
          rows={shirts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            height: "100%",
            width: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            overflowX: "auto", // Ensure no horizontal scroll
          }}
        />
      </Box>
      <UpdateShirtDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        shirt={selectedShirt}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default Dashboard;
