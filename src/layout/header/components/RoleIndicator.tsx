import { Building2, Code } from "lucide-react";
import { useAppContext } from "../../../hooks/useAppContext";

export const RoleIndicator = ({ mobile = false }: { mobile?: boolean }) => {
  const { user } = useAppContext();

  if (!user?.success) return null;

  const userRole = user.user.role;
  const isCompany = userRole === "COMPANY";
  const isDeveloper = userRole === "DEVELOPER";

  if (!isCompany && !isDeveloper) return null;

  return (
    <div
      className={`flex items-center gap-1 ${
        mobile ? "text-xs lg:hidden" : "text-xs"
      }`}
    >
      {isCompany ? (
        <Building2 className="size-7 text-blue-500" />
      ) : (
        <Code className="size-7 text-green-500" />
      )}
    </div>
  );
};
