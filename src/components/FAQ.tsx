import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How quickly can a mechanic reach my location?",
    answer: "Our average response time is 30-60 minutes for emergency services within city limits. For scheduled appointments, we offer same-day and next-day slots based on availability. Our technicians will call you 15 minutes before arrival to confirm."
  },
  {
    question: "What are your service charges and payment options?",
    answer: "We charge a flat inspection fee of $49 which gets waived if you proceed with the repair. Labor charges vary by appliance type and complexity. We accept cash, cards, digital payments, and offer EMI options for repairs above $200. All prices are transparent with no hidden charges."
  },
  {
    question: "Do you provide warranty on repairs?",
    answer: "Yes! We provide a comprehensive 6-month warranty on all repairs and replaced parts. If the same issue occurs within the warranty period, we'll fix it free of charge. Our warranty covers both labor and genuine replacement parts used in the repair."
  },
  {
    question: "Which appliance brands do you service?",
    answer: "We service 50+ brands including Samsung, LG, Whirlpool, Godrej, Haier, Voltas, Carrier, Blue Star, IFB, Bosch, Siemens, and many more. Our technicians are trained and certified to work on both Indian and international brands with access to genuine spare parts."
  },
  {
    question: "Can I track my mechanic and service status?",
    answer: "Absolutely! Once you book a service, you'll receive SMS updates with your technician's details, live location tracking, and estimated arrival time. You can also track the repair progress and receive updates when the job is completed."
  },
  {
    question: "What safety measures do you follow?",
    answer: "All our technicians are background-verified, carry ID cards, and follow strict safety protocols. They wear masks, sanitize hands, and maintain social distancing. We also provide contactless payment options and digital service reports for your safety and convenience."
  },
  {
    question: "Do you service commercial appliances?",
    answer: "Yes, we handle both residential and commercial appliance repairs. For businesses, we offer priority support, bulk service discounts, and AMC (Annual Maintenance Contract) plans. Our commercial services include restaurants, offices, hotels, and retail establishments."
  },
  {
    question: "What if my appliance cannot be repaired?",
    answer: "If repair isn't economically viable, we'll provide honest recommendations for replacement. We partner with leading appliance retailers to offer discounts on new purchases. Our consultation is always transparent about repair vs. replacement to help you make the best decision."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-background" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our appliance repair services, 
            pricing, warranty, and booking process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-card border border-border rounded-xl px-6 shadow-card hover:shadow-card-hover transition-smooth"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our customer support team is available 24/7 to help you with any queries 
            about our services, booking, or technical issues.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Call: +91 9229440845
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Live Chat Support
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="font-semibold text-foreground">Email Support</div>
              <div className="text-sm text-muted-foreground">support@repairup.com</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Response Time</div>
              <div className="text-sm text-muted-foreground">Within 2 hours</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Available</div>
              <div className="text-sm text-muted-foreground">24/7 Customer Care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;