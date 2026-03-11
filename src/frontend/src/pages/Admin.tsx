import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BookOpen,
  FileText,
  Loader2,
  LogIn,
  Megaphone,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Announcement, Material, SamplePaper } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddAnnouncement,
  useAddMaterial,
  useAddSamplePaper,
  useDeleteAnnouncement,
  useDeleteMaterial,
  useDeleteSamplePaper,
  useGenerateId,
  useGetAllAnnouncements,
  useGetAllMaterials,
  useGetAllSamplePapers,
  useIsAdmin,
} from "../hooks/useQueries";

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
];
const FILE_TYPES = ["PDF", "DOC", "VIDEO", "OTHER"];

function MaterialsTab() {
  const { data: materials, isLoading } = useGetAllMaterials();
  const addMat = useAddMaterial();
  const delMat = useDeleteMaterial();
  const generateId = useGenerateId();
  const [form, setForm] = useState({
    title: "",
    classNumber: "",
    subject: SUBJECTS[0],
    description: "",
    fileType: "PDF",
    fileUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.classNumber || !form.fileUrl) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const id = await generateId();
      const mat: Material = {
        id,
        title: form.title,
        classNumber: BigInt(form.classNumber),
        subject: form.subject,
        description: form.description,
        fileType: form.fileType,
        uploadDate: BigInt(Date.now()),
        fileUrl: form.fileUrl,
      };
      await addMat.mutateAsync(mat);
      toast.success("Material added successfully");
      setForm({
        title: "",
        classNumber: "",
        subject: SUBJECTS[0],
        description: "",
        fileType: "PDF",
        fileUrl: "",
      });
    } catch {
      toast.error("Failed to add material");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Study Material</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="mat-title">Title *</Label>
              <Input
                id="mat-title"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Class 10 Algebra Notes"
                className="mt-1"
                data-ocid="admin.material.input"
              />
            </div>
            <div>
              <Label>Class *</Label>
              <Select
                value={form.classNumber}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, classNumber: v }))
                }
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.material.class.select"
                >
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <SelectItem key={c} value={String(c)}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm((p) => ({ ...p, subject: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.material.subject.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>File Type</Label>
              <Select
                value={form.fileType}
                onValueChange={(v) => setForm((p) => ({ ...p, fileType: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.material.filetype.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mat-url">File URL *</Label>
              <Input
                id="mat-url"
                value={form.fileUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fileUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin.material.url.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="mat-desc">Description</Label>
              <Textarea
                id="mat-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Brief description..."
                rows={2}
                className="mt-1"
                data-ocid="admin.material.textarea"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={addMat.isPending}
                data-ocid="admin.material.submit_button"
              >
                {addMat.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Material
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            All Materials ({materials?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div data-ocid="admin.materials.loading_state">
              <Skeleton className="h-12 w-full" />
            </div>
          ) : !materials?.length ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.materials.empty_state"
            >
              No materials yet.
            </p>
          ) : (
            <div className="space-y-2">
              {materials.map((m: Material, idx: number) => (
                <div
                  key={String(m.id)}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border"
                  data-ocid={`admin.material.row.${idx + 1}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{m.title}</p>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="outline" className="text-xs">
                        Class {String(m.classNumber)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {m.subject}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 flex-shrink-0"
                    onClick={() => delMat.mutate(m.id)}
                    data-ocid={`admin.material.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PapersTab() {
  const { data: papers, isLoading } = useGetAllSamplePapers();
  const addPaper = useAddSamplePaper();
  const delPaper = useDeleteSamplePaper();
  const generateId = useGenerateId();
  const [form, setForm] = useState({
    title: "",
    classNumber: "",
    subject: SUBJECTS[0],
    year: "",
    fileUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.classNumber || !form.year || !form.fileUrl) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const id = await generateId();
      const paper: SamplePaper = {
        id,
        title: form.title,
        classNumber: BigInt(form.classNumber),
        subject: form.subject,
        year: BigInt(form.year),
        uploadDate: BigInt(Date.now()),
        fileUrl: form.fileUrl,
      };
      await addPaper.mutateAsync(paper);
      toast.success("Sample paper added");
      setForm({
        title: "",
        classNumber: "",
        subject: SUBJECTS[0],
        year: "",
        fileUrl: "",
      });
    } catch {
      toast.error("Failed to add paper");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Sample Paper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="paper-title">Title *</Label>
              <Input
                id="paper-title"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Class 10 Maths Board Paper 2024"
                className="mt-1"
                data-ocid="admin.paper.input"
              />
            </div>
            <div>
              <Label>Class *</Label>
              <Select
                value={form.classNumber}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, classNumber: v }))
                }
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.paper.class.select"
                >
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <SelectItem key={c} value={String(c)}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm((p) => ({ ...p, subject: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.paper.subject.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paper-year">Year *</Label>
              <Input
                id="paper-year"
                value={form.year}
                onChange={(e) =>
                  setForm((p) => ({ ...p, year: e.target.value }))
                }
                placeholder="2024"
                type="number"
                className="mt-1"
                data-ocid="admin.paper.year.input"
              />
            </div>
            <div>
              <Label htmlFor="paper-url">File URL *</Label>
              <Input
                id="paper-url"
                value={form.fileUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fileUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin.paper.url.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={addPaper.isPending}
                data-ocid="admin.paper.submit_button"
              >
                {addPaper.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Sample Paper
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            All Sample Papers ({papers?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div data-ocid="admin.papers.loading_state">
              <Skeleton className="h-12 w-full" />
            </div>
          ) : !papers?.length ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.papers.empty_state"
            >
              No sample papers yet.
            </p>
          ) : (
            <div className="space-y-2">
              {papers.map((p: SamplePaper, idx: number) => (
                <div
                  key={String(p.id)}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border"
                  data-ocid={`admin.paper.row.${idx + 1}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{p.title}</p>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="outline" className="text-xs">
                        Class {String(p.classNumber)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {p.subject}
                      </Badge>
                      <Badge className="text-xs bg-accent/15 text-accent-foreground border-accent/30">
                        {String(p.year)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 flex-shrink-0"
                    onClick={() => delPaper.mutate(p.id)}
                    data-ocid={`admin.paper.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AnnouncementsTab() {
  const { data: announcements, isLoading } = useGetAllAnnouncements();
  const addAnn = useAddAnnouncement();
  const delAnn = useDeleteAnnouncement();
  const generateId = useGenerateId();
  const [form, setForm] = useState({ title: "", content: "", isPinned: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const id = await generateId();
      const ann: Announcement = {
        id,
        title: form.title,
        content: form.content,
        date: BigInt(Date.now()),
        isPinned: form.isPinned,
      };
      await addAnn.mutateAsync(ann);
      toast.success("Announcement added");
      setForm({ title: "", content: "", isPinned: false });
    } catch {
      toast.error("Failed to add announcement");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="ann-title">Title *</Label>
              <Input
                id="ann-title"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Announcement title"
                className="mt-1"
                data-ocid="admin.announcement.input"
              />
            </div>
            <div>
              <Label htmlFor="ann-content">Content *</Label>
              <Textarea
                id="ann-content"
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Announcement details..."
                rows={3}
                className="mt-1"
                data-ocid="admin.announcement.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="ann-pinned"
                checked={form.isPinned}
                onCheckedChange={(v) => setForm((p) => ({ ...p, isPinned: v }))}
                data-ocid="admin.announcement.switch"
              />
              <Label htmlFor="ann-pinned">Pin this announcement</Label>
            </div>
            <Button
              type="submit"
              disabled={addAnn.isPending}
              data-ocid="admin.announcement.submit_button"
            >
              {addAnn.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Post Announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            All Announcements ({announcements?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div data-ocid="admin.announcements.loading_state">
              <Skeleton className="h-12 w-full" />
            </div>
          ) : !announcements?.length ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.announcements.empty_state"
            >
              No announcements yet.
            </p>
          ) : (
            <div className="space-y-2">
              {announcements.map((a: Announcement, idx: number) => (
                <div
                  key={String(a.id)}
                  className="flex items-start justify-between gap-2 p-3 rounded-lg border border-border"
                  data-ocid={`admin.announcement.row.${idx + 1}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{a.title}</p>
                      {a.isPinned && (
                        <Badge className="text-xs bg-accent/15 text-accent-foreground border-accent/30">
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2 mt-0.5">
                      {a.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 flex-shrink-0"
                    onClick={() => delAnn.mutate(a.id)}
                    data-ocid={`admin.announcement.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading, refetch } = useIsAdmin();
  const isLoggingIn = loginStatus === "logging-in";

  if (isInitializing || adminLoading) {
    return (
      <div
        className="container mx-auto px-4 py-16 max-w-md text-center"
        data-ocid="admin.loading_state"
      >
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mb-6">
            Please log in to access the admin panel and manage content.
          </p>
          <Button
            size="lg"
            onClick={async () => {
              await login();
              refetch();
            }}
            disabled={isLoggingIn}
            className="w-full"
            data-ocid="admin.login.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            {isLoggingIn ? "Logging in..." : "Login to Continue"}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
          data-ocid="admin.error_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            Your account does not have administrator privileges.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage study materials, sample papers & announcements
            </p>
          </div>
        </div>

        <Tabs defaultValue="materials">
          <TabsList className="mb-6 w-full sm:w-auto" data-ocid="admin.tab">
            <TabsTrigger
              value="materials"
              className="flex items-center gap-1.5"
              data-ocid="admin.materials.tab"
            >
              <BookOpen className="w-4 h-4" />
              Materials
            </TabsTrigger>
            <TabsTrigger
              value="papers"
              className="flex items-center gap-1.5"
              data-ocid="admin.papers.tab"
            >
              <FileText className="w-4 h-4" />
              Sample Papers
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="flex items-center gap-1.5"
              data-ocid="admin.announcements.tab"
            >
              <Megaphone className="w-4 h-4" />
              Announcements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="materials">
            <MaterialsTab />
          </TabsContent>
          <TabsContent value="papers">
            <PapersTab />
          </TabsContent>
          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
