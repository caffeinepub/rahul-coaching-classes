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
import { Calendar, Download, FileText, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { SamplePaper } from "../backend.d";
import { useGetAllSamplePapers } from "../hooks/useQueries";

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

const SAMPLE_PAPERS: SamplePaper[] = [
  {
    id: 1n,
    title: "Class 10 Mathematics Board Paper 2024",
    classNumber: 10n,
    subject: "Mathematics",
    year: 2024n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 2n,
    title: "Class 12 Physics Sample Paper 2024",
    classNumber: 12n,
    subject: "Physics",
    year: 2024n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 3n,
    title: "Class 10 Science Practice Paper 2023",
    classNumber: 10n,
    subject: "Science",
    year: 2023n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 4n,
    title: "Class 12 Chemistry Board Paper 2024",
    classNumber: 12n,
    subject: "Chemistry",
    year: 2024n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 5n,
    title: "Class 9 English Half-Yearly Paper 2023",
    classNumber: 9n,
    subject: "English",
    year: 2023n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 6n,
    title: "Class 11 Mathematics Sample Paper 2024",
    classNumber: 11n,
    subject: "Mathematics",
    year: 2024n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 7n,
    title: "Class 8 Social Studies Annual Paper 2023",
    classNumber: 8n,
    subject: "Social Studies",
    year: 2023n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
  {
    id: 8n,
    title: "Class 12 Biology Board Paper 2022",
    classNumber: 12n,
    subject: "Biology",
    year: 2022n,
    uploadDate: BigInt(Date.now()),
    fileUrl: "#",
  },
];

const YEARS = ["All Years", "2025", "2024", "2023", "2022", "2021", "2020"];

function formatDate(time: bigint) {
  const ms = Number(time);
  const d = ms > 1e15 ? new Date(ms / 1_000_000) : new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Papers() {
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: papers, isLoading } = useGetAllSamplePapers();
  const displayPapers = papers && papers.length > 0 ? papers : SAMPLE_PAPERS;

  const filtered = useMemo(() => {
    return displayPapers.filter((p: SamplePaper) => {
      const matchClass =
        classFilter === "all" || String(p.classNumber) === classFilter;
      const matchSubject =
        subjectFilter === "All Subjects" || p.subject === subjectFilter;
      const matchYear =
        yearFilter === "All Years" || String(p.year) === yearFilter;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSubject && matchYear && matchSearch;
    });
  }, [displayPapers, classFilter, subjectFilter, yearFilter, searchQuery]);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Sample Papers
            </h1>
          </div>
          <p className="text-muted-foreground">
            Practice with previous years' question papers and model papers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-ocid="papers.search_input"
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger
              className="w-full sm:w-36"
              data-ocid="papers.class.select"
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
              data-ocid="papers.subject.select"
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
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger
              className="w-full sm:w-32"
              data-ocid="papers.year.select"
            >
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Count */}
        <div className="text-sm text-muted-foreground mb-4">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          sample papers
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="papers.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-44 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="papers.empty_state"
          >
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No papers found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((paper: SamplePaper, idx: number) => (
                <motion.div
                  key={String(paper.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04 }}
                  data-ocid={`papers.item.${idx + 1}`}
                >
                  <Card className="h-full card-hover flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                          {paper.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Class {String(paper.classNumber)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {paper.subject}
                        </Badge>
                        <Badge className="text-xs bg-accent/15 text-accent-foreground border-accent/30 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {String(paper.year)}
                        </Badge>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(paper.uploadDate)}
                        </span>
                        <a
                          href={paper.fileUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`papers.link.${idx + 1}`}
                        >
                          <Button
                            size="sm"
                            variant="default"
                            className="text-xs h-7 gap-1"
                          >
                            <Download className="w-3 h-3" /> Download
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
