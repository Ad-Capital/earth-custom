import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, ChevronRight, ChevronLeft, CheckCircle, AlertCircle, CheckIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

// RoundedButton component (same as before)
interface RoundedButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
  children: React.ReactNode;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  onClick,
  disabled = false,
  type = "button",
  backgroundColor = "#455CE9",
  children
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center px-6 py-3 rounded-full text-white transition-all
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}`}
    style={{ backgroundColor }}
  >
    {children}
  </button>
);

// Form interfaces (same as before)
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredCommunication: 'email' | 'phone';
  artworkType: string;
  medium: string;
  size: string;
  colorPalette: string;
  images: File[];
  imageUrls: string[];
  purpose: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  additionalNotes: string;
  newsletter: boolean;
}

// Component interfaces (same as before)
interface ImageUploadPreviewProps {
  images: File[];
  onRemove: (index: number) => void;
  onAdd: (files: FileList | null) => void;
}

interface ContactInformationProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
  errors: Record<string, string>;
}

interface ArtworkDetailsProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
  onImageAdd: (files: FileList | null) => void;
  onImageRemove: (index: number) => void;
  errors: Record<string, string>;
}

interface FinalDetailsProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
  errors: Record<string, string>;
}

// Sub-components (ImageUploadPreview, ContactInformation, ArtworkDetails, FinalDetails)
// These remain the same as in your original code
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
              aria-label={`Remove image ${index + 1}`}
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      <div
        onClick={handleUploadClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
        role="button"
        tabIndex={0}
        aria-label="Upload reference images"
        onKeyPress={(e) => e.key === 'Enter' && handleUploadClick()}
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
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, onChange, errors }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        required
        aria-invalid={!!errors.fullName}
        aria-describedby={errors.fullName ? "fullName-error" : undefined}
      />
      {errors.fullName && (
        <p id="fullName-error" className="text-sm text-red-500">{errors.fullName}</p>
      )}
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
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
        <p id="email-error" className="text-sm text-red-500">{errors.email}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number (Optional)</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        aria-invalid={!!errors.phone}
        aria-describedby={errors.phone ? "phone-error" : undefined}
      />
      {errors.phone && (
        <p id="phone-error" className="text-sm text-red-500">{errors.phone}</p>
      )}
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

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ formData, onChange, onImageAdd, onImageRemove, errors }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="artworkType">Type of Artwork</Label>
      <Select
        value={formData.artworkType}
        onValueChange={(value) => onChange({ target: { name: 'artworkType', value } })}
      >
        <SelectTrigger id="artworkType" aria-invalid={!!errors.artworkType}>
          <SelectValue placeholder="Select artwork type" />
        </SelectTrigger>
        <SelectContent>
          {["Painting", "Drawing", "Digital Art", "Mixed Media"].map((type) => (
            <SelectItem key={type} value={type.toLowerCase()}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.artworkType && (
        <p className="text-sm text-red-500">{errors.artworkType}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="medium">Medium</Label>
      <Select
        value={formData.medium}
        onValueChange={(value) => onChange({ target: { name: 'medium', value } })}
      >
        <SelectTrigger id="medium" aria-invalid={!!errors.medium}>
          <SelectValue placeholder="Select medium" />
        </SelectTrigger>
        <SelectContent>
          {["Oil", "Acrylic", "Watercolor", "Pastel", "Digital", "Mixed"].map((medium) => (
            <SelectItem key={medium} value={medium.toLowerCase()}>
              {medium}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.medium && (
        <p className="text-sm text-red-500">{errors.medium}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="size">Size</Label>
      <Select
        value={formData.size}
        onValueChange={(value) => onChange({ target: { name: 'size', value } })}
      >
        <SelectTrigger id="size" aria-invalid={!!errors.size}>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {["Small (up to 12\")", "Medium (12-24\")", "Large (24-36\")", "Extra Large (36\"+ )", "Custom Size"].map((size) => (
            <SelectItem key={size} value={size.toLowerCase()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.size && (
        <p className="text-sm text-red-500">{errors.size}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="colorPalette">Color Palette</Label>
      <Textarea
        id="colorPalette"
        name="colorPalette"
        placeholder="Describe your preferred colors or mood (e.g., warm tones, monochrome, vibrant)"
        value={formData.colorPalette}
        onChange={onChange}
        aria-invalid={!!errors.colorPalette}
      />
      {errors.colorPalette && (
        <p className="text-sm text-red-500">{errors.colorPalette}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label>Reference Images</Label>
      <ImageUploadPreview
        images={formData.images}
        onRemove={onImageRemove}
        onAdd={onImageAdd}
      />
        {errors.images && (
        <p className="text-sm text-red-500 mt-2">{errors.images}</p>
      )}
    </div>
  </div>
);

const FinalDetails: React.FC<FinalDetailsProps> = ({ formData, onChange, errors }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="purpose">Purpose of the Artwork</Label>
      <Select
        value={formData.purpose}
        onValueChange={(value) => onChange({ target: { name: 'purpose', value } })}
      >
        <SelectTrigger id="purpose" aria-invalid={!!errors.purpose}>
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
      {errors.purpose && (
        <p className="text-sm text-red-500">{errors.purpose}</p>
      )}
    </div>

    {/* Shipping Address Section */}
    <div className="space-y-4 pt-4">
      <h3 className="font-medium">Shipping Address</h3>

      <div className="space-y-2">
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={onChange}
          placeholder="Street address, P.O. box"
          required
          aria-invalid={!!errors.addressLine1}
          aria-describedby={errors.addressLine1 ? "addressLine1-error" : undefined}
        />
        {errors.addressLine1 && (
          <p id="addressLine1-error" className="text-sm text-red-500">{errors.addressLine1}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={onChange}
          placeholder="Apt, suite, unit, building, floor, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            required
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <p id="city-error" className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State/Province/Region</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            required
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? "state-error" : undefined}
          />
          {errors.state && (
            <p id="state-error" className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal/ZIP Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            required
            aria-invalid={!!errors.postalCode}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
          />
          {errors.postalCode && (
            <p id="postalCode-error" className="text-sm text-red-500">{errors.postalCode}</p>
          )}
        </div>

        <div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select
    value={formData.country}
    onValueChange={(value) => onChange({ target: { name: 'country', value } })}
  >
    <SelectTrigger id="country" aria-invalid={!!errors.country}>
      <SelectValue placeholder="Select country" />
    </SelectTrigger>
    <SelectContent className="max-h-[300px]">
      <div className="px-2 sticky top-[-4] bg-white z-10">
        <Input 
          placeholder="Search countries..." 
          className="border-b rounded-md w-full" 
          onChange={(e) => {
            // Get the search input element
            const input = e.target;
            // Get all country items
            const items = input.closest('.select-content')?.querySelectorAll('.country-item') || [];
            // Filter items based on search text
            const searchText = input.value.toLowerCase();
            items.forEach((item) => {
              const text = item.textContent?.toLowerCase() || '';
              if (text.includes(searchText)) {
                (item as HTMLElement).style.display = 'block';
              } else {
                (item as HTMLElement).style.display = 'none';
              }
            });
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {[
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
        "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
        "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", 
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
        "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
        "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
      ].map((country) => (
        <SelectItem key={country} value={country} className="country-item">
          {country}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  {errors.country && (
    <p className="text-sm text-red-500">{errors.country}</p>
  )}
</div>
      </div>
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

// Validation functions (same as before)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^\+?[0-9\s\-()]+$/;
  return phoneRegex.test(phone);
};

// Main OrderForm Component
const OrderForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

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
    imageUrls: [],
    purpose: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    additionalNotes: '',
    newsletter: false
  });

  // Process images to base64 whenever they change
  useEffect(() => {
    const processImages = async () => {
      const imagePromises = formData.images.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      const imageUrls = await Promise.all(imagePromises);
      setFormData(prev => ({ ...prev, imageUrls }));
    };

    if (formData.images.length > 0) {
      processImages();
    }
  }, [formData.images]);

  // Handle successful submission with proper routing
  useEffect(() => {
    if (submitStatus === 'success') {
      // Set flag to redirect after showing success message
      setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);
    }
  }, [submitStatus]);

  // Add navigation without using Next.js router
  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/';
    }
  }, [shouldRedirect]);

  // Memoize the validation function
  const validateCurrentPage = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentPage === 0) {
      // Validate contact information
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (formData.phone && !isValidPhone(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }

    } else if (currentPage === 1) {
      // Validate artwork details
      if (!formData.artworkType) {
        newErrors.artworkType = "Please select an artwork type";
      }

      if (!formData.medium) {
        newErrors.medium = "Please select a medium";
      }

      if (!formData.size) {
        newErrors.size = "Please select a size";
      }

    } else if (currentPage === 2) {
      // Validate final details
      if (!formData.purpose) {
        newErrors.purpose = "Please select a purpose";
      }

      if (!formData.addressLine1.trim()) {
        newErrors.addressLine1 = "Address line 1 is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State/Province/Region is required";
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Postal/ZIP code is required";
      }

      if (!formData.country) {
        newErrors.country = "Please select a country";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentPage, formData]);

  // Update form validity when page or form data changes
  useEffect(() => {
    setIsFormValid(validateCurrentPage());
  }, [currentPage, formData, validateCurrentPage]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Add this function in the OrderForm component
const validateImage = (file: File): boolean => {
  // Check file size (limit to 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    setErrors(prev => ({
      ...prev,
      images: `Image ${file.name} exceeds the 5MB size limit`
    }));
    return false;
  }
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    setErrors(prev => ({
      ...prev,
      images: `Image ${file.name} is not a supported format. Please use JPEG, PNG, GIF, or WebP.`
    }));
    return false;
  }
  
  return true;
};

const handleAddImages = (files: FileList | null) => {
  if (files) {
    // Clear previous errors
    if (errors.images) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.images;
        return updated;
      });
    }
    
    // Filter valid files
    const validFiles = Array.from(files).filter(validateImage);
    
    // Limit to a reasonable number of images (e.g., 3)
    const newFiles = validFiles.slice(0, 3 - formData.images.length);
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles]
    }));
  }
};

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Upload images to backend
  const uploadImages = async (imageUrls: string[]): Promise<string[]> => {
    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: imageUrls }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      return data.imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };

  // Modify your form's handleSubmit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (currentPage === pages.length - 1 && isFormValid) {
      setSubmitting(true);
      setSubmitStatus('idle');
  
      try {
        // Upload images if there are any
        let imageUrls: string[] = [];
        
        if (formData.imageUrls.length > 0) {
          console.log("Uploading images, count:", formData.imageUrls.length);
          
          try {
            const uploadResponse = await fetch('/api/uploads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ images: formData.imageUrls }),
            });
            
            console.log("Upload response status:", uploadResponse.status);
            
            // Get the raw response text first to debug
            const uploadResponseText = await uploadResponse.text();
            console.log("Raw upload response:", uploadResponseText);
            
            if (!uploadResponseText) {
              throw new Error("Empty response from upload API");
            }
            
            try {
              // Try to parse the text as JSON
              const uploadData = JSON.parse(uploadResponseText);
              
              if (!uploadData.success) {
                throw new Error(`Image upload failed: ${uploadData.message}`);
              }
              
              imageUrls = uploadData.imageUrls || [];
              console.log(`Successfully uploaded ${imageUrls.length} images`);
            } catch (jsonError) {
              console.error("JSON parse error for upload response:", jsonError);
              throw new Error(`Failed to parse upload response: ${(jsonError as Error).message}`);
            }
          } catch (uploadError) {
            console.error("Image upload error:", uploadError);
            // Continue with order submission even if image upload fails
          }
        }
  
        // Prepare order data
        const orderData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredCommunication: formData.preferredCommunication,
          artworkType: formData.artworkType,
          medium: formData.medium,
          size: formData.size,
          colorPalette: formData.colorPalette,
          imageUrls: imageUrls,
          purpose: formData.purpose,
          shippingAddress: {
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country
          },
          additionalNotes: formData.additionalNotes,
          newsletter: formData.newsletter,
          orderDate: new Date()
        };
  
        console.log("Submitting order with data:", JSON.stringify(orderData));
        
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        
        console.log("Order response status:", orderResponse.status);
        
        // Get the raw response text first
        const orderResponseText = await orderResponse.text();
        console.log("Raw order response:", orderResponseText);
        
        if (!orderResponseText) {
          throw new Error("Empty response from orders API");
        }
        
        try {
          // Try to parse the text as JSON
          const orderResult = JSON.parse(orderResponseText);
          
          if (!orderResult.success) {
            throw new Error(`Order submission failed: ${orderResult.message}`);
          }
          
          setSubmitStatus('success');
        } catch (jsonError) {
          console.error("JSON parse error for order response:", jsonError);
          throw new Error(`Failed to parse order response: ${(jsonError as Error).message}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleNext = () => {
    if (isFormValid) {
      setCurrentPage(prev => prev + 1);
    } else {
      validateCurrentPage(); // This will update the errors state
    }
  };

  const handleBack = () => {
    setCurrentPage(prev => prev - 1);
  };

  // Define array of pages for easy navigation
  const pages = [
    {
      title: "Contact Info",
      component: <ContactInformation formData={formData} onChange={handleInputChange} errors={errors} />
    },
    {
      title: "Artwork Details",
      component: <ArtworkDetails
        formData={formData}
        onChange={handleInputChange}
        onImageAdd={handleAddImages}
        onImageRemove={handleRemoveImage}
        errors={errors}
      />
    },
    {
      title: "Final Details",
      component: <FinalDetails formData={formData} onChange={handleInputChange} errors={errors} />
    }
  ];

  // Progress indicator
  const progressPercentage = ((currentPage + 1) / pages.length) * 100;

  return (
    <div className="w-full mx-auto sm:px-4 py-8">
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Custom Artwork Order</h1>
        <p className="text-gray-600">Please fill out this form to request a custom artwork piece.</p>
      </div> */}

      {/* Progress bar */}
      {/* <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="bg-purple-600 h-2 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div> */}

      {/* Step indicator */}
      <div className="w-full my-8 px-2 py-6">
      <div className="flex justify-between items-center">
        {pages.map((page, index) => {
          // Determine status
          const isCompleted = index < currentPage;
          const isCurrent = index === currentPage;
          
          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Display step indicator */}
              <div className="mb-3 relative">
                {/* Base circle/dot */}
                <div className={`w-3 h-3 rounded-full mx-auto ${
                  isCompleted ? 'bg-purple-500' : 
                  isCurrent ? 'bg-purple-500' : 'bg-gray-200'
                }`}></div>
                
                {/* Outer ring - only for current step */}
                {isCurrent && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-teal-300 animate-pulse"></div>
                )}
                
                {/* Second ring - only for current step */}
                {isCurrent && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-teal-400"></div>
                )}
                
                {/* Check icon for completed steps */}
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Connecting lines */}
              {index < pages.length - 1 && (
                <div className="absolute top-1.5 w-full h-px right-0 -z-10 transform translate-x-1/2">
                  <div className={`h-0.5 w-full ${
                    index < currentPage ? 'bg-gradient-to-r from-purple-500 to-purple-300' : 'bg-gray-200'
                  }`}></div>
                </div>
              )}
              
              {/* Label */}
              <span className={`mt-4 text-sm font-medium ${
                isCurrent ? 'text-purple-700' : 
                isCompleted ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {page.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Current page content */}
        {pages[currentPage].component}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          {currentPage > 0 ? (
            <RoundedButton
              onClick={handleBack}
              backgroundColor="#6B7280"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              Back
            </RoundedButton>
          ) : (
            <div />
          )}

          {currentPage < pages.length - 1 ? (
            <RoundedButton
              onClick={handleNext}
              disabled={!isFormValid}
            >
              Next
              <ChevronRight className="ml-2 w-5 h-5" />
            </RoundedButton>
          ) : (
            <RoundedButton
              type="submit"
              disabled={submitting || !isFormValid}
            >
              {submitting ? 'Submitting...' : 'Submit Order'}
            </RoundedButton>
          )}
        </div>
      </form>

      {/* Success message */}
      {submitStatus === 'success' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Order Submitted!</h2>
            <p className="text-gray-600 mb-6">Thank you for your order. We'll contact you shortly to discuss the details.</p>
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We couldn't process your order. Please try again later.</p>
            <RoundedButton onClick={() => setSubmitStatus('idle')}>
              Close
            </RoundedButton>
          </div>
        </div>
      )}
    </div>
  );
  };

export default OrderForm;