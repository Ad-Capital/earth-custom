import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoundedButton from '@/constants/RoundedButtons';
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, ChevronRight, ChevronLeft } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  // Contact Information
  fullName: string;
  email: string;
  phone: string;
  preferredCommunication: 'email' | 'phone';

  // Artwork Details
  artworkType: string;
  medium: string;
  size: string;
  colorPalette: string;
  images: File[];

  // Final Details
  purpose: string;
  budget: string;
  deadline: string;
  shippingAddress: string;
  additionalNotes: string;
  newsletter: boolean;
}

interface ImageUploadPreviewProps {
  images: File[];
  onRemove: (index: number) => void;
  onAdd: (files: FileList | null) => void;
}

interface ContactInformationProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

interface ArtworkDetailsProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
  onImageAdd: (files: FileList | null) => void;
  onImageRemove: (index: number) => void;
}

interface FinalDetailsProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ images, onRemove, onAdd }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {images.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
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

      <div
        onClick={handleUploadClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">Click to upload reference images</p>
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

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, onChange }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number (Optional)</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
      />
    </div>

    <div className="space-y-4">
      <Label>Preferred Method of Communication</Label>
      <RadioGroup
        value={formData.preferredCommunication}
        onValueChange={(value: 'email' | 'phone') =>
          onChange({ target: { name: 'preferredCommunication', value } })
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="comm-email" />
          <Label htmlFor="comm-email">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="phone" id="comm-phone" />
          <Label htmlFor="comm-phone">Phone</Label>
        </div>
      </RadioGroup>
    </div>
  </div>
);

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ formData, onChange, onImageAdd, onImageRemove }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="artworkType">Type of Artwork *</Label>
      <Select
        value={formData.artworkType}
        onValueChange={(value) => onChange({ target: { name: 'artworkType', value } })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select artwork type" />
        </SelectTrigger>
        <SelectContent>
          {["Painting", "Sculpture", "Digital Art", "Mixed Media"].map((type) => (
            <SelectItem key={type} value={type.toLowerCase()}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="colorPalette">Color Palette</Label>
      <Textarea
        id="colorPalette"
        name="colorPalette"
        placeholder="Describe your preferred colors or mood (e.g., warm tones, monochrome, vibrant)"
        value={formData.colorPalette}
        onChange={onChange}
      />
    </div>

    <div className="space-y-2">
      <Label>Reference Images</Label>
      <ImageUploadPreview
        images={formData.images}
        onRemove={onImageRemove}
        onAdd={onImageAdd}
      />
    </div>
  </div>
);

const FinalDetails: React.FC<FinalDetailsProps> = ({ formData, onChange }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="purpose">Purpose of the Artwork *</Label>
      <Select
        value={formData.purpose}
        onValueChange={(value) => onChange({ target: { name: 'purpose', value } })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select purpose" />
        </SelectTrigger>
        <SelectContent>
          {["Personal Collection", "Gift", "Corporate Space", "Gallery"].map((purpose) => (
            <SelectItem key={purpose} value={purpose.toLowerCase()}>
              {purpose}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="budget">Budget Range *</Label>
      <Select
        value={formData.budget}
        onValueChange={(value) => onChange({ target: { name: 'budget', value } })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select budget range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="under500">Under $500</SelectItem>
          <SelectItem value="500to1000">$500 - $1,000</SelectItem>
          <SelectItem value="1000to2000">$1,000 - $2,000</SelectItem>
          <SelectItem value="over2000">Over $2,000</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="deadline">Deadline *</Label>
      <Input
        id="deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={onChange}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="shippingAddress">Shipping Address *</Label>
      <Textarea
        id="shippingAddress"
        name="shippingAddress"
        value={formData.shippingAddress}
        onChange={onChange}
        placeholder="Enter your complete shipping address"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="additionalNotes">Additional Notes</Label>
      <Textarea
        id="additionalNotes"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={onChange}
        placeholder="Any special requests or additional information?"
      />
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox
        id="newsletter"
        checked={formData.newsletter}
        onCheckedChange={(checked) =>
          onChange({ target: { name: 'newsletter', value: checked } })
        }
      />
      <Label htmlFor="newsletter">Sign up for our newsletter</Label>
    </div>
  </div>
);

const OrderForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredCommunication: 'email',
    artworkType: '',
    medium: '',
    size: '',
    colorPalette: '',
    images: [],
    purpose: '',
    budget: '',
    deadline: '',
    shippingAddress: '',
    additionalNotes: '',
    newsletter: false
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImages = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const pages = [
    {
      title: "Contact Information",
      component: <ContactInformation formData={formData} onChange={handleInputChange} />
    },
    {
      title: "Artwork Details",
      component: <ArtworkDetails
        formData={formData}
        onChange={handleInputChange}
        onImageAdd={handleAddImages}
        onImageRemove={handleRemoveImage}
      />
    },
    {
      title: "Final Details",
      component: <FinalDetails formData={formData} onChange={handleInputChange} />
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
      <div>
        <div className="py-6">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-2xl font-bold">{pages[currentPage].title}</h2>
            <div className="text-sm text-gray-500">
              Step {currentPage + 1} of {pages.length}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {pages[currentPage].component}

            <div className="flex justify-between mt-16">
              <RoundedButton
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 0}
                backgroundColor="#455CE9"
              >
                <ChevronLeft className="w-6 h-6 mr-2 z-10 text-white" />
                <p>Previous</p>
              </RoundedButton>

              <RoundedButton
                onClick={() => setCurrentPage(prev => prev + 1)}
                backgroundColor="#455CE9"
              >
                <p>Next</p>
                <ChevronRight className="w-6 h-6 ml-2 z-10 text-white" />
              </RoundedButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;