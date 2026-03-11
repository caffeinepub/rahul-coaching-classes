import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Megaphone,
  Pin,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetAllAnnouncements, useGetStats } from "../hooks/useQueries";

const CLASS_GRADIENTS = [
  "class-card-gradient-1",
  "class-card-gradient-2",
  "class-card-gradient-3",
  "class-card-gradient-4",
  "class-card-gradient-5",
  "class-card-gradient-6",
  "class-card-gradient-7",
  "class-card-gradient-8",
  "class-card-gradient-9",
  "class-card-gradient-10",
  "class-card-gradient-11",
  "class-card-gradient-12",
];

const CLASS_LABELS = [
  "Primary",
  "Primary",
  "Primary",
  "Primary",
  "Primary",
  "Middle",
  "Middle",
  "Secondary",
  "Secondary",
  "Senior",
  "Senior",
  "Senior",
];

const SAMPLE_ANNOUNCEMENTS = [
  {
    id: 1n,
    title: "New Study Materials for Class 10 Mathematics",
    content:
      "Comprehensive chapter-wise notes and practice problems for Board exam preparation have been uploaded.",
    date: BigInt(Date.now()),
    isPinned: true,
  },
  {
    id: 2n,
    title: "Sample Papers for Class 12 Physics \u2013 2025 Series",
    content:
      "Previous 5-year question papers with solutions are now available for download.",
    date: BigInt(Date.now() - 86400000),
    isPinned: true,
  },
  {
    id: 3n,
    title: "Admission Open for Session 2025-26",
    content:
      "Enroll now for Classes 6 to 12. Limited seats available. Contact the office for details.",
    date: BigInt(Date.now() - 172800000),
    isPinned: false,
  },
];

function formatDate(time: bigint) {
  const ms = Number(time);
  if (ms > 1e15)
    return new Date(ms / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: announcements, isLoading: announcementsLoading } =
    useGetAllAnnouncements();

  const allAnnouncements =
    announcements && announcements.length > 0
      ? announcements
      : SAMPLE_ANNOUNCEMENTS;

  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 font-medium">
              \uD83C\uDF93 Excellence in Education
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-4">
              Rahul Coaching
              <span className="block text-primary">Classes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Complete study materials and sample papers for Classes 1 to 12.
              Excel in your exams with expert guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/materials" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                data-ocid="hero.primary_button"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Materials
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/papers" })}
                className="font-semibold"
                data-ocid="hero.secondary_button"
              >
                <FileText className="w-4 h-4 mr-2" />
                Sample Papers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              {
                icon: BookOpen,
                label: "Study Materials",
                value: statsLoading ? null : Number(stats?.totalMaterials ?? 0),
              },
              {
                icon: FileText,
                label: "Sample Papers",
                value: statsLoading ? null : Number(stats?.totalPapers ?? 0),
              },
              {
                icon: Megaphone,
                label: "Announcements",
                value: statsLoading
                  ? null
                  : Number(stats?.totalAnnouncements ?? 0),
              },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="text-primary-foreground"
                data-ocid="home.stats.card"
              >
                <Icon className="w-6 h-6 mx-auto mb-1 opacity-80" />
                {value === null ? (
                  <Skeleton className="h-8 w-12 mx-auto mb-1 bg-primary-foreground/20" />
                ) : (
                  <div className="font-display font-bold text-3xl">{value}</div>
                )}
                <div className="text-sm opacity-75">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Browse by Class
            </h2>
            <p className="text-muted-foreground mt-1">
              Select your class to find relevant study materials
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((cls, idx) => (
              <motion.button
                key={cls}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() =>
                  navigate({ to: "/materials", search: { class: String(cls) } })
                }
                className={`${CLASS_GRADIENTS[idx]} rounded-xl p-4 text-center cursor-pointer card-hover group relative overflow-hidden border border-white/20 shadow-xs`}
                data-ocid={`home.class.item.${cls}`}
              >
                <div className="font-display font-bold text-2xl text-white drop-shadow-sm">
                  {cls}
                </div>
                <div className="text-xs text-white/80 font-medium">
                  Class {cls}
                </div>
                <div className="text-[10px] text-white/60 mt-0.5">
                  {CLASS_LABELS[idx]}
                </div>
                <ArrowRight className="w-3 h-3 text-white/60 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-12 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-accent" />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Announcements
            </h2>
          </div>

          {announcementsLoading ? (
            <div className="space-y-3" data-ocid="announcements.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : allAnnouncements.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="announcements.empty_state"
            >
              No announcements yet.
            </div>
          ) : (
            <div className="space-y-3">
              {allAnnouncements.slice(0, 5).map((ann, idx) => (
                <motion.div
                  key={String(ann.id)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`announcements.item.${idx + 1}`}
                >
                  <Card className="card-hover">
                    <CardContent className="p-4 flex items-start gap-3">
                      {ann.isPinned && (
                        <Pin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground text-sm">
                            {ann.title}
                          </h3>
                          {ann.isPinned && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-accent/15 text-accent-foreground border-accent/30"
                            >
                              Pinned
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {ann.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(ann.date)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 50%, white 0%, transparent 60%), radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
              }}
            />
            <TrendingUp className="w-10 h-10 text-primary-foreground/60 mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-3">
              Start Learning Today
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Access hundreds of study materials and practice papers curated for
              your class and subject.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate({ to: "/materials" })}
                data-ocid="cta.primary_button"
              >
                Explore Materials <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate({ to: "/papers" })}
                data-ocid="cta.secondary_button"
              >
                Download Papers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
