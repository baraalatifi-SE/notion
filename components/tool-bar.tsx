"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { IconPicker } from "./IconPicker";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title || "Untitled");
  const update = useMutation(api.documents.updateDocument);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  return (
    <div className="group relative w-full flex flex-col items-center">
      {/* Icon Section - Centered with Enhanced Styling */}
      {!!initialData.icon && !preview && (
        <div className="flex flex-col items-center pt-6 pb-3 group/icon">
          <div className="relative transform hover:scale-105 transition-all duration-300 ease-out">
            <IconPicker onIconChange={onIconSelect}>
              <div className="relative cursor-pointer">
                {/* Subtle glow effect behind icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover/icon:opacity-70 transition-opacity duration-300" />
                <p
                  className="relative hover:opacity-85 transition-all duration-200 leading-none drop-shadow-sm"
                  style={{ fontSize: "72px" }}
                >
                  {initialData.icon}
                </p>
              </div>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="absolute -bottom-1 -right-1 rounded-full transition-all duration-200 text-muted-foreground text-xs h-6 w-6 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              variant="outline"
              size="sm"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Icon Section - Preview Mode */}
      {!!initialData.icon && preview && (
        <div className="flex justify-center pt-6 pb-3">
          <p
            className="leading-none drop-shadow-sm"
            style={{ fontSize: "72px" }}
          >
            {initialData.icon}
          </p>
        </div>
      )}

      {/* Add Icon/Cover Buttons - Centered with Modern Styling */}
      {!initialData.icon && !preview && (
        <div className="flex items-center justify-center gap-x-1 py-8 transition-all duration-300">
          <IconPicker asChild onIconChange={onIconSelect}>
            <Button
              className="text-muted-foreground/70 text-sm hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200 gap-2"
              variant="ghost"
              size="sm"
            >
              <Smile className="h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
          {!initialData.coverImage && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground/70 text-sm hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200 gap-2"
              onClick={coverImage.onOpen}
            >
              <ImageIcon className="h-4 w-4" />
              Add cover
            </Button>
          )}
        </div>
      )}

      {/* Add Cover Button when icon exists - Centered */}
      {!!initialData.icon && !initialData.coverImage && !preview && (
        <div className="flex justify-center pb-3 transition-all duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground/70 text-sm hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200 gap-2"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4" />
            Add cover
          </Button>
        </div>
      )}

      {/* Title Section - Centered with Enhanced Typography */}
      <div className="w-full py-1 flex justify-center">
        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onChange={(event) => onInput(event.target.value)}
            onKeyDown={onKeyDown}
            value={value}
            className="w-auto bg-transparent resize-none font-bold text-center break-words outline-none text-[#37352F] dark:text-[#E8E8E8] placeholder:text-muted-foreground/40 leading-[1.2] tracking-tight"
            placeholder="Untitled"
            style={{ fontSize: "42px" }}
          />
        ) : (
          <div
            onClick={enableInput}
            className="w-auto font-bold text-center break-words outline-none text-[#37352F] dark:text-[#E8E8E8] cursor-text py-1 leading-[1.2] tracking-tight hover:bg-primary/[0.02] rounded-lg transition-colors duration-200"
            style={{ fontSize: "42px" }}
          >
            {initialData.title || "Untitled"}
          </div>
        )}
      </div>

      {/* Subtle decorative accent line */}
      <div className="h-px w-16 bg-gradient-to-r from-primary/20 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default Toolbar;
