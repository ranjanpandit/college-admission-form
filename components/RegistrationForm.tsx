"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

/* ----------------------------------------
   TYPES
---------------------------------------- */

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  accept?: string;
  min?: number | null;
  max?: number | null;
  pattern?: string | null;
  patternMessage?: string | null;
}

interface Tab {
  id?: string;
  title: string;
  icon?: string;
  fields: Field[];
}

interface Theme {
  background: string;
  card: string;
  primary: string;
  button: string;
  text: string;
}

interface FormResponse {
  tabs: Tab[];
  theme?: Partial<Theme>;
}

/* ----------------------------------------
   DEFAULT THEME (MATCHES OLD UI)
---------------------------------------- */

const DEFAULT_THEME: Theme = {
  background: "#0f172a", // dark bg
  card: "#1e293b", // glass card
  primary: "#2563eb", // blue active tab
  button: "#2563eb", // primary button
  text: "#ffffff",
};

/* ----------------------------------------
   COMPONENT
---------------------------------------- */

export default function RegistrationForm() {
  const params = useParams();
  const formId = (params?.id as string) || "1";

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState<Record<string, any>>({});
  const [preview, setPreview] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  /* ----------------------------------------
     LOAD FORM + THEME
  ---------------------------------------- */
  useEffect(() => {
    async function loadForm() {
      try {
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API}/forms/${formId}`, {
          cache: "no-store",
          credentials: "include",
        });

        const data: FormResponse = await res.json();
        setTabs(data.tabs || []);

        if (data.theme) {
          setTheme({
            background: data.theme.background ?? DEFAULT_THEME.background,
            card: data.theme.card ?? DEFAULT_THEME.card,
            primary: data.theme.primary ?? DEFAULT_THEME.primary,
            button: data.theme.button ?? DEFAULT_THEME.button,
            text: data.theme.text ?? DEFAULT_THEME.text,
          });
        } else {
          setTheme(DEFAULT_THEME);
        }
      } catch {
        toast.error("Failed to load form");
      }
    }

    loadForm();
  }, [formId]);

  /* ----------------------------------------
     FIELD CHANGE
  ---------------------------------------- */
  const handleChange = (name: string, value: any, accept?: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (accept === "image/*" && value instanceof File) {
      setProfilePic(URL.createObjectURL(value));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ----------------------------------------
     VALIDATION
  ---------------------------------------- */
  const validateTab = () => {
    const currentFields = (tabs[activeIndex] as any)?.fields;
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
  const validateTabByIndex = (index: number) => {
    const fields = tabs[index]?.fields || [];
    const newErrors: Record<string, string> = {};

    fields.forEach((f) => {
      if (f.required && !form[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }

      if (f.pattern && form[f.name]) {
        const regex = new RegExp(f.pattern);
        if (!regex.test(form[f.name])) {
          newErrors[f.name] = f.patternMessage || `${f.label} is invalid`;
        }
      }

      if ((f.type === "number" || f.type === "date") && form[f.name]) {
        if (f.min && form[f.name] < f.min)
          newErrors[f.name] = `${f.label} should be >= ${f.min}`;
        if (f.max && form[f.name] > f.max)
          newErrors[f.name] = `${f.label} should be <= ${f.max}`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }

    return true;
  };

  const next = () => validateTab() && setActiveIndex((i) => i + 1);
  const prev = () => setActiveIndex((i) => i - 1);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTab()) setPreview(true);
  };

  /* ----------------------------------------
     RENDER FIELD (RESTORED OLD LOOK)
  ---------------------------------------- */
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
              onChange={(e) => handleChange(field.name, e.target.value, "")}
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
              onChange={(e) => handleChange(field.name, e.target.value, "")}
            />
          ) : field.type === "file" ? (
            <>
              <input
                type="file"
                accept={field.accept || ".pdf"}
                className="bg-white/10 text-gray-100 border-none outline-none w-full cursor-pointer"
                onChange={(e: any) =>
                  handleChange(field.name, e.target.files?.[0], field?.accept)
                }
              />
              {field.accept === "image/*" && profilePic && (
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
              onChange={(e) => handleChange(field.name, e.target.value, "")}
            />
          )}
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    );
  };

  /* ----------------------------------------
     SUBMIT
  ---------------------------------------- */
  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("formId", formId);

      tabs.forEach((tab) =>
        tab.fields.forEach((field) => {
          const value = form[field.name];
          if (value !== undefined) {
            formData.append(field.name, value);
          }
        })
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/form-responses`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error();

      toast.success("Form submitted successfully");
      setForm({});
      setPreview(false);
    } catch {
      toast.error("Submission failed");
    }
  };
  if (preview) {
    return (
      <main
        style={
          {
            "--bg": theme.background,
            "--card": theme.card,
            "--primary": theme.primary,
            "--button": theme.button,
            "--text": theme.text,
          } as React.CSSProperties
        }
        className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)] text-[var(--text)]"
      >
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-[var(--card)] shadow-xl backdrop-blur">
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
                <span className="text-gray-300 font-medium capitalize">
                  {key?.replace(/_/g, " ")}
                </span>
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

  /* ----------------------------------------
     UI
  ---------------------------------------- */
  return (
    <main
      style={
        {
          "--bg": theme.background,
          "--card": theme.card,
          "--primary": theme.primary,
          "--button": theme.button,
          "--text": theme.text,
        } as React.CSSProperties
      }
      className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)] text-[var(--text)]"
    >
      <div className="w-full max-w-4xl p-8 rounded-2xl bg-[var(--card)] shadow-xl backdrop-blur">
        <h2 className="text-3xl font-bold text-center mb-6">Admission Form</h2>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                // Always allow going backward
                if (idx <= activeIndex) {
                  setActiveIndex(idx);
                  return;
                }

                // Validate all previous tabs before moving forward
                for (let i = 0; i < idx; i++) {
                  const valid = validateTabByIndex(i);
                  if (!valid) {
                    toast.error("Please complete previous section first");
                    return;
                  }
                }

                setActiveIndex(idx);
              }}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                idx > activeIndex ? "opacity-60 cursor-not-allowed" : ""
              }

                ${
                  activeIndex === idx
                    ? "bg-[var(--primary)] text-white shadow"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }
              `}
            >
              {t.icon && <Icon icon={t.icon} />}
              {t.title}
            </button>
          ))}
        </div>

        {!preview ? (
          <form onSubmit={onSubmit}>
            {tabs[activeIndex]?.fields.map(renderField)}

            <div className="flex justify-between mt-8">
              {activeIndex > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="text-white/80 hover:text-white"
                >
                  Previous
                </button>
              )}

              {activeIndex < tabs.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="
                    px-5 py-2 rounded-lg
                    bg-[var(--button)]
                    text-white font-medium
                    hover:brightness-110
                    active:scale-[0.98]
                    transition
                  "
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="
                    px-5 py-2 rounded-lg
                    bg-[var(--button)]
                    text-white font-medium
                    hover:brightness-110
                    active:scale-[0.98]
                    transition
                  "
                >
                  Preview
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl mb-4">Preview</h3>
            <button
              onClick={handleConfirm}
              className="
                px-6 py-2 rounded-lg
                bg-[var(--button)]
                text-white font-medium
                hover:brightness-110
                active:scale-[0.98]
                transition
              "
            >
              Confirm & Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
