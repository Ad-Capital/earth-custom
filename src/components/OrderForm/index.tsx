import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload } from 'lucide-react';

interface FormData {
  name: string;
  emailPhone: string;
  artworkType: string;
  preferredStyle: string;
  notes: string;
}

interface ImagePreviewProps {
  images: File[];
  onRemove: (index: number) => void;
  onAdd: (files: FileList | null) => void;
}

const ImageUploadPreview = ({ images, onRemove, onAdd }: ImagePreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-[70%] mt-4">
      {/* Preview Area */}
      <div className="flex flex-wrap gap-4 mb-4">
        {images.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button and Input */}
      <div 
        onClick={handleUploadClick}
        className="border-b border-input cursor-pointer py-2 transition-all hover:border-b-2 hover:border-primary"
      >
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Upload Reference Images</span>
          <Upload className="w-4 h-4" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onAdd(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
};

const OrderForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    emailPhone: '',
    artworkType: '',
    preferredStyle: '',
    notes: '',
  });

  const [images, setImages] = useState<File[]>([]);

  const artworkTypes = [
    "Digital Illustration",
    "Logo Design",
    "Character Design",
    "Animation",
    "3D Modeling",
  ];

  const styleOptions = [
    "Minimalist",
    "Cartoon",
    "Realistic",
    "Abstract",
    "Retro",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddImages = (files: FileList | null) => {
    if (files) {
      setImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, images });
    // Handle form submission logic here
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailPhone">Email/Phone Number</Label>
            <Input
              id="emailPhone"
              name="emailPhone"
              placeholder="your email"
              value={formData.emailPhone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artworkType">Type of Artwork</Label>
            <Select
              value={formData.artworkType}
              onValueChange={(value) => handleSelectChange(value, 'artworkType')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select artwork type" />
              </SelectTrigger>
              <SelectContent>
                {artworkTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredStyle">Preferred Style</Label>
            <Select
              value={formData.preferredStyle}
              onValueChange={(value) => handleSelectChange(value, 'preferredStyle')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred style" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((style) => (
                  <SelectItem key={style} value={style.toLowerCase()}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Reference Images</Label>
            <ImageUploadPreview
              images={images}
              onRemove={handleRemoveImage}
              onAdd={handleAddImages}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Description"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            After submitting your request, we will review your details and reach out with a quote.
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;