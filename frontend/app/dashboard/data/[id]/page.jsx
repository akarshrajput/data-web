"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { dataAPI } from "@/lib/api";

export default function DataDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataDetail();
  }, [params.id]);

  const fetchDataDetail = async () => {
    try {
      const response = await dataAPI.getDataById(params.id);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center">Data not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-semibold">{data.type || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-semibold">{data.category || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sub Category</p>
              <p className="font-semibold">{data.subCategory || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Industry</p>
              <p className="font-semibold">{data.industry || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Employee Count</p>
              <p className="font-semibold">{data.employeeCount || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Established Year</p>
              <p className="font-semibold">{data.establishedYear || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-semibold">{data.revenue || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Annual Turnover</p>
              <p className="font-semibold">{data.annualTurnover || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Company Type</p>
              <p className="font-semibold">{data.companyType || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">GST Number</p>
              <p className="font-semibold">{data.gstNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">PAN Number</p>
              <p className="font-semibold">{data.panNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CIN Number</p>
              <p className="font-semibold">{data.cinNumber || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Street Address</p>
              <p className="font-semibold">{data.address?.street || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">City</p>
              <p className="font-semibold">{data.address?.city || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">State</p>
              <p className="font-semibold">{data.address?.state || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Country</p>
              <p className="font-semibold">{data.address?.country || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pincode</p>
              <p className="font-semibold">{data.address?.pincode || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Landmark</p>
              <p className="font-semibold">{data.address?.landmark || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-semibold">{data.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-semibold">{data.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Alternate Phone</p>
              <p className="font-semibold">{data.alternatePhone || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fax</p>
              <p className="font-semibold">{data.fax || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Website</p>
              <p className="font-semibold">
                {data.website ? (
                  <a
                    href={
                      data.website.startsWith("http")
                        ? data.website
                        : `https://${data.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {(data.socialMedia?.facebook ||
        data.socialMedia?.twitter ||
        data.socialMedia?.linkedin ||
        data.socialMedia?.instagram ||
        data.socialMedia?.youtube) && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Facebook</p>
                <p className="font-semibold">
                  {data.socialMedia?.facebook ? (
                    <a
                      href={data.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.socialMedia.facebook}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Twitter</p>
                <p className="font-semibold">
                  {data.socialMedia?.twitter ? (
                    <a
                      href={data.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.socialMedia.twitter}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">LinkedIn</p>
                <p className="font-semibold">
                  {data.socialMedia?.linkedin ? (
                    <a
                      href={data.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.socialMedia.linkedin}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Instagram</p>
                <p className="font-semibold">
                  {data.socialMedia?.instagram ? (
                    <a
                      href={data.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.socialMedia.instagram}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">YouTube</p>
                <p className="font-semibold">
                  {data.socialMedia?.youtube ? (
                    <a
                      href={data.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.socialMedia.youtube}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{data.description || "N/A"}</p>
        </CardContent>
      </Card>

      {(data.services?.length > 0 ||
        data.products?.length > 0 ||
        data.certifications?.length > 0 ||
        data.awards?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Services, Products & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground font-semibold mb-2">
                Services
              </p>
              {data.services?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground font-semibold mb-2">
                Products
              </p>
              {data.products?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.products.map((product, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground font-semibold mb-2">
                Certifications
              </p>
              {data.certifications?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-green-100 px-3 py-1 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground font-semibold mb-2">Awards</p>
              {data.awards?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.awards.map((award, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 px-3 py-1 rounded-full text-sm"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {data.people && data.people.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key People</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.people.map((person, index) => (
                <div key={index} className="border rounded p-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p>
                      {person.designation && (
                        <p className="text-sm text-muted-foreground">
                          {person.designation}
                        </p>
                      )}
                      {person.department && (
                        <p className="text-sm text-muted-foreground">
                          Department: {person.department}
                        </p>
                      )}
                    </div>
                    <div className="text-sm">
                      {person.email && (
                        <p className="text-muted-foreground">
                          Email: {person.email}
                        </p>
                      )}
                      {person.phone && (
                        <p className="text-muted-foreground">
                          Phone: {person.phone}
                        </p>
                      )}
                      {person.alternatePhone && (
                        <p className="text-muted-foreground">
                          Alt Phone: {person.alternatePhone}
                        </p>
                      )}
                      {person.linkedIn && (
                        <p className="text-muted-foreground">
                          LinkedIn: {person.linkedIn}
                        </p>
                      )}
                      {person.twitter && (
                        <p className="text-muted-foreground">
                          Twitter: {person.twitter}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {Object.entries(data.metadata).map(([key, value]) => (
                <div key={key}>
                  <p className="text-muted-foreground capitalize">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="font-semibold">{value || "N/A"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
