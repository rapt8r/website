"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CONTACT_INFO } from "@/lib/constants"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  const t = useTranslations("Contact")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-green-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        
        <Container className="relative z-20 text-center text-white">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <div className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-green-950 mb-6">{t('infoTitle')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-900">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('phone')}</h3>
                      <p className="text-muted-foreground mt-1">{CONTACT_INFO.phone}</p>
                      <p className="text-sm text-muted-foreground mt-1">{t('workingHours')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-900">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('email')}</h3>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-muted-foreground mt-1 hover:text-green-800 transition-colors">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-900">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('address')}</h3>
                      <p className="text-muted-foreground mt-1">
                        {CONTACT_INFO.address.street}<br />
                        {CONTACT_INFO.address.city}<br />
                        {t('country')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-900">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('businessHours')}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t.rich('businessHoursValue', {
                          br: () => <br />
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder (Optional) */}
              <div className="bg-green-50 rounded-3xl p-8 h-64 flex items-center justify-center text-green-800">
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="w-8 h-8" />
                  <span className="font-medium">{t('mapViewComingSoon')}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-green-950 mb-2">{t('formTitle')}</h2>
              <p className="text-muted-foreground mb-8">{t('formSubtitle')}</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-900">{t('form.firstName')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('form.placeholders.firstName')} 
                              className="w-full px-4 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-900 outline-none transition-all bg-gray-50/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-900">{t('form.lastName')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('form.placeholders.lastName')} 
                              className="w-full px-4 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-900 outline-none transition-all bg-gray-50/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">{t('form.email')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('form.placeholders.email')} 
                            type="email"
                            className="w-full px-4 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-900 outline-none transition-all bg-gray-50/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">{t('form.subject')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-900 outline-none transition-all bg-gray-50/50">
                              <SelectValue placeholder={t('form.placeholders.subject')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sales">{t('form.subjects.sales')}</SelectItem>
                            <SelectItem value="support">{t('form.subjects.support')}</SelectItem>
                            <SelectItem value="partnership">{t('form.subjects.partnership')}</SelectItem>
                            <SelectItem value="other">{t('form.subjects.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">{t('form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('form.placeholders.message')} 
                            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-green-900 outline-none transition-all bg-gray-50/50 resize-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit"
                    className="w-full bg-green-900 cursor-pointer hover:bg-green-950 text-white px-8 py-2 h-auto rounded-full font-semibold text-md transition-all duration-300"
                  >
                    {t('form.submit')}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </Container>
      </div>
    </div>
  )
}
