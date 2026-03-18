import { Id } from "../../../../convex/_generated/dataModel";
import { ProjectIdLayout } from "../../../features/projects/components/project-id-layout";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId: projectIdString } = await params;
  const projectId = projectIdString as Id<"projects">;

  return (
    <ProjectIdLayout projectId={projectId}>
      {children}
    </ProjectIdLayout>
  );
};

export default Layout;