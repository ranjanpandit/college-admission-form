"use client";

import { Key, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";


export interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  pattern?: string;
  patternMessage?: string;
  min?: number;
  max?: number;
  accept?: string;
}

export default function RegistrationForm() {
  const { id } = useParams(); // ID from URL: /student-form/1
  const [tabs, setTabs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState<Record<string, any>>({});
  const [preview, setPreview] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
      async function loadForm() {
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;

        const res = await fetch(`${API}/forms/1`, {
          cache: "no-store",
        });

        const form = await res.json();
        setTabs(form.tabs);
      }

      loadForm();
    }, [id]);


  if (tabs.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading admission form...
      </main>
    );
  }

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "photo" && value) setProfilePic(URL.createObjectURL(value));

    // clear error when user enters value
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateTab = () => {
    const currentFields = tabs[activeIndex]?.fields;
    const newErrors: Record<string, string> = {};

    currentFields.forEach((f: Field) => {
      if (f.required && !form[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }
      // Optional: pattern validation
      if (f.pattern && form[f.name]) {
        const regex = new RegExp(f.pattern);
        if (!regex.test(form[f.name])) {
          newErrors[f.name] = f.patternMessage || `${f.label} is invalid`;
        }
      }
      // Optional: min/max for numbers
      if ((f.type === "number" || f.type === "date") && form[f.name]) {
        if (f.min && form[f.name] < f.min)
          newErrors[f.name] = `${f.label} should be >= ${f.min}`;
        if (f.max && form[f.name] > f.max)
          newErrors[f.name] = `${f.label} should be <= ${f.max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateTab()) setActiveIndex((i) => Math.min(i + 1, tabs.length - 1));
  };
  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateTab()) setPreview(true);
  };

  const renderField = (field: any) => {
    const value = form[field.name] || "";
    const errorMsg = errors[field.name];

    return (
      <div key={field.name} className="mb-5">
        <label className="block text-gray-100 font-semibold mb-2">
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <div
          className={`flex items-center gap-3 bg-white/5 backdrop-blur-sm border rounded-xl p-3 
          ${errorMsg ? "border-red-500" : "border-white/20"}`}
        >
          {field.icon && (
            <Icon icon={field.icon} className="text-gray-300 text-xl" />
          )}

          {field.type === "select" ? (
            <select
              className="bg-white/10 text-gray-100 border-none outline-none w-full appearance-none px-3 py-2 rounded-lg"
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="" className="text-gray-500">
                Select...
              </option>
              {field.options?.map((o: any, i: number) => (
                <option key={i} value={o} className="text-gray-900">
                  {o}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              className="bg-white/10 text-gray-100 border-none outline-none w-full resize-none"
              rows={3}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === "file" ? (
            <>
              <input
                type="file"
                accept={field.name === "photo" ? "image/*" : ".pdf"}
                className="bg-white/10 text-gray-100 border-none outline-none w-full cursor-pointer"
                onChange={(e: any) =>
                  handleChange(field.name, e.target.files?.[0])
                }
              />
              {field.name === "photo" && profilePic && (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="mt-3 w-24 h-24 rounded-full object-cover border border-white/20"
                />
              )}
            </>
          ) : (
            <input
              type={field.type}
              className="bg-white/10 text-gray-100 border-none outline-none w-full"
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    );
  };

  const handleConfirm = async () => {
  try {
    const payload = {
      formId: 1, // dynamic ID from URL or props
      studentId: null, // optionally pass logged-in user ID
      data: form,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/form-responses`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to submit");

    toast.success("Form submitted successfully!");

    setForm({});
    setProfilePic("");
    setPreview(false);
  } catch (err) {
   toast.error(err?.message || "Submission failed");
  }
};


  if (preview) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700">
        <div className="w-full max-w-3xl glass p-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
            Preview Submission
          </h2>

          {profilePic && (
            <div className="flex justify-center mb-6">
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border border-white/20 object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {Object.keys(form).map((key) => (
              <div
                key={key}
                className="p-3 bg-white/5 rounded-lg flex justify-between"
              >
                <span className="text-gray-300 font-medium">{key}</span>
                <span className="text-gray-100 font-semibold">
                  {form[key]?.name || form[key]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setPreview(false)}
            >
              Edit
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-4xl glass p-8">
        <h2 className="text-4xl font-bold text-gray-100 mb-6 text-center">
          Admission Form
        </h2>

        {/* Stepper */}
        <div className="flex justify-center items-center mb-6 gap-2">
          {tabs.map((_: any, idx: Key | null | undefined) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === idx ? "bg-blue-500 scale-110" : "bg-gray-500/40"
              }`}
            ></div>
          ))}
        </div>

        {/* Tabs navigation */}
        <div className="flex gap-3 mb-6 overflow-auto">
          {tabs.map((t: any, idx: number) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                activeIndex === idx
                  ? "bg-blue-600 scale-105 text-white font-semibold"
                  : "bg-white/10 text-gray-200"
              }`}
            >
              <Icon icon={t.icon} />
              <span>{t.title}</span>
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          {tabs[activeIndex].fields.map((f: any) => renderField(f))}

          <div className="flex justify-between mt-6">
            {activeIndex > 0 && (
              <button
                type="button"
                onClick={prev}
                className="px-5 py-2 rounded-lg bg-white/20 text-gray-100 hover:bg-white/30"
              >
                Previous
              </button>
            )}

            {activeIndex < tabs.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              >
                Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
