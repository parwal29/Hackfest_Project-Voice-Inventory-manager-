import { DashboardCard } from "@/components/DashboardCard";
import { Users, UserPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Collaborators() {
  const collaborators = [
    { name: "Suyoshi R.", role: "Admin", email: "suyoshi@inventure.com", initials: "SR" },
    { name: "John Doe", role: "Manager", email: "john@inventure.com", initials: "JD" },
    { name: "Jane Smith", role: "Staff", email: "jane@inventure.com", initials: "JS" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Collaborators</h1>
          <p className="text-muted-foreground mt-1">Manage team members and permissions</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collaborators.map((person) => (
          <DashboardCard key={person.email}>
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-accent">
                <AvatarFallback className="text-white font-semibold">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
              <p className="text-sm text-primary mb-1">{person.role}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{person.email}</span>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard>
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Grow Your Team</h3>
          <p className="text-muted-foreground mb-4">Invite more team members to collaborate</p>
          <Button variant="outline">Send Invitations</Button>
        </div>
      </DashboardCard>
    </div>
  );
}
