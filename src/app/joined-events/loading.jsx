import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JoinedEventsLoading() {
  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="w-full max-w-2xl">
            <Skeleton className="h-7 w-32 rounded-full" />
            <Skeleton className="mt-4 h-10 w-64 max-w-full" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
          <Skeleton className="h-12 w-40 shrink-0 rounded-full" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              className="gap-0 overflow-hidden rounded-3xl border-0 bg-card py-0 ring-1 ring-border"
            >
              <Skeleton className="h-48 w-full rounded-none" />
              <CardHeader className="gap-3 px-5 pt-5">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="px-5">
                <Skeleton className="h-10 w-full" />
              </CardContent>
              <CardFooter className="mt-2 border-border bg-transparent px-5 py-4">
                <Skeleton className="h-9 w-full rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
