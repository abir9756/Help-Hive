export function getTodayInputValue() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function getUpcomingEvents(
  events,
  { category = "All Events", search = "", limit } = {}
) {
  if (!Array.isArray(events) || events.length === 0) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((event) => {
      if (!event.date) return false;
      const eventDate = new Date(`${event.date}T00:00:00`);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
    })
    .filter((event) =>
      category === "All Events" ? true : event.category === category
    )
    .filter((event) =>
      `${event.title} ${event.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function formatEventDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
