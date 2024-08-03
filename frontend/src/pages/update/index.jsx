// src/components/UpdateShirtDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const UpdateShirtDialog = ({ open, onClose, shirt, onUpdate }) => {
  const [formData, setFormData] = useState({
    warna: "",
    ukuran: "",
    harga: "",
    stok: "",
  });

  useEffect(() => {
    if (shirt) {
      setFormData({
        warna: shirt.warna || "",
        ukuran: shirt.ukuran || "",
        harga: shirt.harga || "",
        stok: shirt.stok || "",
      });
    }
  }, [shirt]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (shirt && shirt.id) {
      onUpdate(shirt.id, formData);
      onClose();
    } else {
      console.error("Update failed: shirt or shirt.id is missing.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Shirt</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="warna"
          label="Warna"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.warna}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="ukuran"
          label="Ukuran"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.ukuran}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="harga"
          label="Harga"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.harga}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stok"
          label="Stok"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.stok}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateShirtDialog;