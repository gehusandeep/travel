import { createLegalPage } from '@/components/content/legal-page';
import { privacyPolicy } from '@/content/legal';
import { routes } from '@/lib/routes';

const legalPage = createLegalPage(privacyPolicy, routes.privacy);

export const metadata = legalPage.metadata;
export default legalPage.Page;
