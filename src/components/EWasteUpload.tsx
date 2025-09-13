import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Upload, Loader2 } from "lucide-react";

export function EWasteUpload() {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      setPreviewUrl(null);
      return;
    }

    const file = e.target.files[0];
    setImage(file);

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit an e-waste request",
        variant: "destructive"
      });
      return;
    }

    if (!image || !title) {
      toast({
        title: "Error",
        description: "Please provide an image and title",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Upload image to Supabase Storage
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ewaste-images')
        .upload(`public/${fileName}`, image);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('ewaste-images')
        .getPublicUrl(`public/${fileName}`);

      // Create e-waste request record
      const { error: insertError } = await supabase
        .from('ewaste_requests')
        .insert({
          user_id: user.id,
          title,
          description,
          image_url: publicUrl,
          status: 'pending'
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Your e-waste request has been submitted successfully!"
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreviewUrl(null);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit e-waste request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter appliance name and model"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the condition and any relevant details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <div className="flex items-center space-x-4">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image')?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Image
            </Button>
          </div>
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto max-h-[200px] rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            'Submit E-waste Request'
          )}
        </Button>
      </form>
    </Card>
  );
}