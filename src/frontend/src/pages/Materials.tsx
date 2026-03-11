import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  ExternalLink,
  File,
  FileText,
  Search,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Material } from "../backend.d";
import { useGetAllMaterials } from "../hooks/useQueries";

const SUBJECTS = [
  "All Subjects",
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

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  DOC: <File className="w-4 h-4" />,
  OTHER: <File className="w-4 h-4" />,
};

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: "bg-red-100 text-red-700 border-red-200",
  VIDEO: "bg-blue-100 text-blue-700 border-blue-200",
  DOC: "bg-green-100 text-green-700 border-green-200",
  OTHER: "bg-gray-100 text-gray-700 border-gray-200",
};

const SAMPLE_MATERIALS: Material[] = [
  {
    id: 1n,
    title: "Class 10 Mathematics \u2013 Complete Algebra Notes",
    classNumber: 10n,
    subject: "Mathematics",
    description:
      "Detailed notes covering quadratic equations, polynomials, and coordinate geometry with solved examples.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 2n,
    title: "Class 12 Physics \u2013 Electrostatics Chapter",
    classNumber: 12n,
    subject: "Physics",
    description:
      "Comprehensive notes on Coulomb's law, electric field, and potential with diagrams.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 3n,
    title: "Class 8 Science \u2013 Cell Biology Video Lecture",
    classNumber: 8n,
    subject: "Science",
    description:
      "Engaging video lecture explaining cell structure, organelles, and functions.",
    fileType: "VIDEO",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 4n,
    title: "Class 6 English \u2013 Grammar Workbook",
    classNumber: 6n,
    subject: "English",
    description:
      "Complete grammar exercises including tenses, voice, and comprehension passages.",
    fileType: "DOC",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 5n,
    title: "Class 9 Social Studies \u2013 Indian History Notes",
    classNumber: 9n,
    subject: "Social Studies",
    description:
      "Chapter-wise notes on French Revolution, Russian Revolution, and Nazism.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 6n,
    title: "Class 11 Chemistry \u2013 Organic Chemistry Basics",
    classNumber: 11n,
    subject: "Chemistry",
    description:
      "Introduction to hydrocarbons, functional groups, and IUPAC nomenclature.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 7n,
    title: "Class 5 Mathematics \u2013 Fractions & Decimals",
    classNumber: 5n,
    subject: "Mathematics",
    description:
      "Simple and fun worksheets on fractions, decimals, and basic operations.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 8n,
    title: "Class 12 Biology \u2013 Human Reproduction",
    classNumber: 12n,
    subject: "Biology",
    description:
      "Detailed notes with diagrams on male and female reproductive systems.",
    fileType: "PDF",
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
];

function formatDate(time: bigint) {
  const ms = Number(time);
  const d = ms > 1e15 ? new Date(ms / 1_000_000) : new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Materials() {
  const search = useSearch({ strict: false }) as { class?: string };
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState(search.class || "all");

  const { data: materials, isLoading } = useGetAllMaterials();
  const displayMaterials =
    materials && materials.length > 0 ? materials : SAMPLE_MATERIALS;

  const filtered = useMemo(() => {
    return displayMaterials.filter((m: Material) => {
      const matchClass =
        classFilter === "all" || String(m.classNumber) === classFilter;
      const matchSubject =
        subjectFilter === "All Subjects" || m.subject === subjectFilter;
      const matchSearch =
        !searchQuery ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSubject && matchSearch;
    });
  }, [displayMaterials, classFilter, subjectFilter, searchQuery]);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Study Materials
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive notes, worksheets, and resources for all classes
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-ocid="materials.search_input"
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger
              className="w-full sm:w-36"
              data-ocid="materials.class.select"
            >
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                <SelectItem key={c} value={String(c)}>
                  Class {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger
              className="w-full sm:w-44"
              data-ocid="materials.subject.select"
            >
              <SelectValue placeholder="Subject" />
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

        <div className="text-sm text-muted-foreground mb-4">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          materials
          {classFilter !== "all" && (
            <span>
              {" "}
              for Class{" "}
              <span className="font-semibold text-foreground">
                {classFilter}
              </span>
            </span>
          )}
        </div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="materials.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="materials.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No materials found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((mat: Material, idx: number) => (
                <motion.div
                  key={String(mat.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04 }}
                  data-ocid={`materials.item.${idx + 1}`}
                >
                  <Card className="h-full card-hover flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                            {mat.title}
                          </h3>
                        </div>
                        <Badge
                          className={`text-xs flex-shrink-0 flex items-center gap-1 ${FILE_TYPE_COLORS[mat.fileType] || FILE_TYPE_COLORS.OTHER}`}
                        >
                          {FILE_TYPE_ICONS[mat.fileType] ||
                            FILE_TYPE_ICONS.OTHER}
                          {mat.fileType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Class {String(mat.classNumber)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {mat.subject}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs line-clamp-2 flex-1">
                        {mat.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(mat.uploadDate)}
                        </span>
                        <a
                          href={mat.fileUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`materials.link.${idx + 1}`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Open
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
