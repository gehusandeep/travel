import { createLegalPage } from '@/components/content/legal-page';
import { refundPolicy } from '@/content/legal';
import { routes } from '@/lib/routes';

const legalPage = createLegalPage(refundPolicy, routes.refunds);

export const metadata = legalPage.metadata;
export default legalPage.Page;
