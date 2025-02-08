using Microsoft.EntityFrameworkCore;
using CommentApi.Models;

namespace  CommentApi.Data;

public   class  ApplicationDbContext : DbContext
{
     public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>(entity => 
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.ToTable("Users");
            
            entity.Property(u => u.Name).HasMaxLength(100).IsRequired();
            entity.Property(u => u.Email).HasMaxLength(255).IsRequired();
            entity.Property(u => u.PasswordHash).IsRequired();
        });

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User) 
            .WithMany(u => u.Comments) 
            .HasForeignKey(c => c.UserId) 
            .OnDelete(DeleteBehavior.Cascade); 
    }
}