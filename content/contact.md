---
title: "Contact"
description: "Get in touch to discuss projects, collaborations, or just to say hello"
date: 2025-08-11
draft: false
type: "contact"
layout: "single"
---

## Get In Touch

I'm always interested in discussing new projects, sharing knowledge, or exploring collaboration opportunities. Whether you have a project idea, need development expertise, or just want to connect with a fellow developer, I'd love to hear from you.

### Let's Connect

```csharp
public class ContactPreferences
{
    public List<string> BestForDiscussing { get; set; } = new()
    {
        "C# and .NET development projects",
        "Full-stack application architecture",
        "Code reviews and mentoring",
        "Open source contributions",
        "Technology consulting"
    };

    public ResponseTime ExpectedResponse => new()
    {
        Email = TimeSpan.FromHours(24),
        LinkedIn = TimeSpan.FromHours(12),
        ProjectInquiries = TimeSpan.FromHours(6)
    };
}
```

### Contact Form

<form id="contactForm" class="contact-form" name="contact" netlify>
<div class="form-group">
<label for="name">Your Name</label>
<input type="text" id="name" name="name" required minlength="2" maxlength="100" placeholder="Enter your name" />
<div id="name-error" class="error-message"></div>
</div>

<div class="form-group">
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required placeholder="your.email@example.com" />
<div id="email-error" class="error-message"></div>
</div>

<div class="form-group">
<label for="subject">Subject</label>
<input type="text" id="subject" name="subject" required minlength="5" maxlength="200" placeholder="What would you like to discuss?" />
<div id="subject-error" class="error-message"></div>
</div>

<div class="form-group">
<label for="message">Message</label>
<textarea id="message" name="message" required minlength="10" maxlength="2000" rows="6" placeholder="Tell me about your project or inquiry..."></textarea>
<div id="message-error" class="error-message"></div>
</div>

<div class="form-actions">
<button type="submit" class="contact-submit-btn btn btn-primary">
<span class="btn-return-type">Task&lt;bool&gt;</span>
<span class="btn-method">SubmitMessage</span>
<span class="btn-params">()</span>
</button>
<button type="reset" class="btn btn-secondary">
<span class="btn-return-type">void</span>
<span class="btn-method">ClearForm</span>
<span class="btn-params">()</span>
</button>
</div>

<div id="formStatus" class="form-status"></div>
</form>

### Alternative Contact Methods

If you prefer to reach out directly:

- **Email**: [sadaruwan12@gmail.com](mailto:sadaruwan12@gmail.com)
- **LinkedIn**: [Connect with me on LinkedIn](https://linkedin.com/in/sadaruwan-samaraweera)
- **GitHub**: [Check out my repositories](https://github.com/s4ndm4n82)

### Response Time

```csharp
public async Task<ContactResponse> ProcessInquiry(ContactRequest request)
{
    var response = new ContactResponse();

    switch (request.Type)
    {
        case InquiryType.Project:
            response.EstimatedResponseTime = TimeSpan.FromHours(6);
            break;
        case InquiryType.Collaboration:
            response.EstimatedResponseTime = TimeSpan.FromHours(12);
            break;
        case InquiryType.General:
            response.EstimatedResponseTime = TimeSpan.FromHours(24);
            break;
    }

    await QueueForReview(request);
    return response;
}
```

I typically respond to inquiries within 24 hours, and project-related discussions usually get priority with faster response times.

### What I'm Currently Looking For

- **Interesting C# projects** that challenge conventional approaches
- **Open source collaborations** in the .NET ecosystem
- **Technical writing** and content creation partnerships
- **Speaking opportunities** at developer meetups and conferences
- **Teaching opportunities** looking forward to sharing my knowledge with the next generation
- **Mentoring opportunities** with junior developers

Looking forward to connecting with you!
