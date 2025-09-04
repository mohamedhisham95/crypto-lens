'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

// UI
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function BreadCrumbHeader() {
  const pathname = usePathname();
  const paths = pathname === '/' ? [''] : pathname?.split('/');

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === '' ? 'dashboard' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
