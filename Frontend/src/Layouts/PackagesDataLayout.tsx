import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { getData } from '@/services/services'
import { useCompanyPackageStore } from '@/store/services/company-package-store'

const PackagesDataLayout = ({ children }: { children: React.ReactNode }) => {
  const { setPackageData } = useCompanyPackageStore()
  const { data: packagesRes } = useQuery({
    queryKey: ["packages"],
    queryFn: () => getData("/packages")
  });
  const packages = packagesRes?.data?.packages ?? [];

  useEffect(() => {
    if (packages.length > 0) {
      setPackageData(packages)
    }
  }, [packages])
  return <div>
    {children}
  </div>
}

export default PackagesDataLayout