import { InternalLink } from "@/ui/components/links/InternalLink";
import { PageContainer } from "@/ui/components/containers/PageContainer";
import { Main } from "@/ui/components/containers/Main";
import { CodeTag } from "@/ui/components/tags/CodeTag";
import { Typo } from "@/ui/components/typographies";

export default function About() {
  return (
    <PageContainer>
      <Main>
        <Typo.Title1>About Page</Typo.Title1>

        <Typo.Body>
          Get started by editing
          <CodeTag>pages/about.tsx</CodeTag>
        </Typo.Body>

        <InternalLink name="&larr; Go Back" href="/" />
      </Main>
    </PageContainer>
  );
}
