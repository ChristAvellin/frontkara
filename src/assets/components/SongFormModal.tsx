import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const genres = ["Pop", "Hip-Hop", "Country", "Rock", "Jazz"];

const SongFormModal = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    duration: ""
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    } else {
      setFormData({ title: "", artist: "", genre: "", duration: "" });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (value) => {
    setFormData(prev => ({ ...prev, genre: value }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.artist && formData.genre && formData.duration) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Song" : "Add Song"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <Select value={formData.genre} onValueChange={handleGenreChange}>
            <SelectTrigger>{formData.genre || "Select Genre"}</SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="duration"
            placeholder="Duration (e.g. 3:30)"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {defaultValues ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SongFormModal;
