using Microsoft.AspNetCore.Mvc;
using CommentApi.Models;
using CommentApi.Services;
using CommentApi.Common;
using CommentApi.Dtos;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace CommentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper; 

    public UsersController(IUserService userService, IAuthService authService, IMapper mapper)
    {
        _userService = userService;
        _authService = authService;
                _mapper = mapper; 

    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<object>>> Login(LoginRequest request)
    {
        var user = await _userService.GetUserByEmailAsync(request.Email);
        if (user == null)
        {
            return BadRequest(ApiResponse<object>.Fail("Invalid email or password"));
        }

        if (!_userService.VerifyPassword(user, request.Password))
        {
            return BadRequest(ApiResponse<object>.Fail("Invalid email or password"));
        }

        var accessToken = _authService.GenerateToken(user);
        var refreshToken = _authService.GenerateRefreshToken();

        SetTokenCookie(accessToken, "accessToken", 1 * 24 *60);
        SetTokenCookie(refreshToken, "refreshToken", 7 * 24 * 60); 

        return Ok(ApiResponse<object>.Ok(new
        {
            user = new
            {
                user.Id,
                user.Name,
                user.Email
            },
            accessToken = accessToken, 
            refreshToken = refreshToken 
        }, "Login successful"));
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<object>>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var accessToken = Request.Cookies["accessToken"];

        if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(accessToken))
        {
            return BadRequest(ApiResponse<object>.Fail("Tokens are required"));
        }

        var userId = _authService.ValidateToken(accessToken);
        if (userId == null)
        {
            return BadRequest(ApiResponse<object>.Fail("Invalid access token"));
        }

        var user = await _userService.GetUserByIdAsync(userId.Value);
        if (user == null)
        {
            return BadRequest(ApiResponse<object>.Fail("User not found"));
        }

        // var newAccessToken = _authService.GenerateToken(user);
        // SetTokenCookie(newAccessToken, "accessToken", 15);

        return Ok(ApiResponse<object>.Ok(null, "Token refreshed successfully"));
    }

    [HttpPost("logout")]
    public ActionResult<ApiResponse<object>> Logout()
    {
        Response.Cookies.Delete("accessToken");
        Response.Cookies.Delete("refreshToken");

        return Ok(ApiResponse<object>.Ok(null, "Logged out successfully"));
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        
        if (userIdClaim == null)
        {
            return Unauthorized(ApiResponse<object>.Fail("User not authenticated"));
        }

        int userId = int.Parse(userIdClaim.Value);
        var user = await _userService.GetUserByIdAsync(userId);
        
        if (user == null)
        {
            return NotFound(ApiResponse<object>.Fail($"User with ID {userId} not found"));
        }

        var userDetailDto = _mapper.Map<UserDetailDto>(user);

        return Ok(ApiResponse<UserDetailDto>.Ok(userDetailDto, "User retrieved successfully"));
    }
    private void SetTokenCookie(string token, string key, int expirationMinutes)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,  
            SameSite = SameSiteMode.Strict,  
            Expires = DateTime.Now.AddMinutes(expirationMinutes)
        };
        Response.Cookies.Append(key, token, cookieOptions);
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<User>>>> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(ApiResponse<IEnumerable<User>>.Ok(users, "Users retrieved successfully"));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<UserDetailDto>>> GetUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        
        if (user == null)
        {
            return NotFound(ApiResponse<UserDetailDto>.Fail($"User with ID {id} not found"));
        }

        // Menggunakan AutoMapper
        var userDto = _mapper.Map<UserDetailDto>(user);

        return Ok(ApiResponse<UserDetailDto>.Ok(userDto, "User retrieved successfully"));
    }
    

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<User>>> CreateUser(CreateUserRequest request)
    {
        try
        {
            var user = new User
            {
                Name = request.Name,
                Email = request.Email
            };

            var createdUser = await _userService.CreateUserAsync(user, request.Password);
            
            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, 
                ApiResponse<User>.Ok(createdUser, "User created successfully"));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<User>.Fail("Failed to create user", new List<string> { ex.Message }));
        }
        catch (Exception)
        {
            return StatusCode(500, ApiResponse<User>.Fail("An error occurred while creating the user"));
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<User>>> UpdateUser(int id, UpdateUserRequest request)
    {
        try
        {
            var userToUpdate = new User
            {
                Name = request.Name,
                Email = request.Email
            };

            var updatedUser = await _userService.UpdateUserAsync(id, userToUpdate);

            return updatedUser == null 
                ? NotFound(ApiResponse<User>.Fail($"User with ID {id} not found"))
                : Ok(ApiResponse<User>.Ok(updatedUser, "User updated successfully"));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<User>.Fail("Failed to update user", new List<string> { ex.Message }));
        }
        catch (Exception)
        {
            return StatusCode(500, ApiResponse<User>.Fail("An error occurred while updating the user"));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteUser(int id)
    {
        var result = await _userService.DeleteUserAsync(id);

        return result 
            ? Ok(ApiResponse<object>.Ok(null, "User deleted successfully"))
            : NotFound(ApiResponse<object>.Fail($"User with ID {id} not found"));
    }

    [HttpGet("email/{email}")]
    public async Task<ActionResult<ApiResponse<User>>> GetUserByEmail(string email)
    {
        var user = await _userService.GetUserByEmailAsync(email);

        return user == null 
            ? NotFound(ApiResponse<User>.Fail($"User with email {email} not found"))
            : Ok(ApiResponse<User>.Ok(user, "User retrieved successfully"));
    }
}