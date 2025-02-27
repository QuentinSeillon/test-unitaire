<?php
namespace tests;

use Exception;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Quentin\GestionProduit\UserManager;


class UserManagerTest extends TestCase
{
    private UserManager $userManager;

    protected function setUp(): void
    {
        $this->userManager = new UserManager();
    }

    protected function tearDown(): void
    {
        // Supprime tous les utilisateurs après chaque test
        $users = $this->userManager->getUsers();
        foreach ($users as $user) {
            $this->userManager->removeUser($user['id']);
        }
    }

    public function testAddUser(): void
    {
        $this->userManager->addUser("John Doe", "john.doe@example.com");
        $users = $this->userManager->getUsers();
        $this->assertCount(1, $users);
        $this->assertEquals("John Doe", $users[0]['name']);
        $this->assertEquals("john.doe@example.com", $users[0]['email']);
    }

    public function testAddUserEmailException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage("Email invalide.");
        $this->userManager->addUser("John Doe", "invalid-email");
    }

    public function testUpdateUser(): void
    {
        $this->userManager->addUser("John Doe", "john.doe@example.com");
        $users = $this->userManager->getUsers();
        $userId = $users[0]['id'] ?? null;

        $this->assertNotNull($userId, "L'ID de l'utilisateur ne doit pas être nul");

        $this->userManager->updateUser($userId, "Jane Doe", "jane.doe@example.com");
        $user = $this->userManager->getUser($userId);

        $this->assertEquals("Jane Doe", $user['name']);
        $this->assertEquals("jane.doe@example.com", $user['email']);
    }

    public function testRemoveUser(): void
    {
        $this->userManager->addUser("John Doe", "john.doe@example.com");
        $users = $this->userManager->getUsers();
        $userId = $users[0]['id'] ?? null;

        $this->assertNotNull($userId, "L'ID de l'utilisateur ne doit pas être nul");

        $this->userManager->removeUser($userId);
        $users = $this->userManager->getUsers();

        $this->assertCount(0, $users);
    }

    public function testGetUsers(): void
    {
        $this->userManager->addUser("John Doe", "john.doe@example.com");
        $this->userManager->addUser("Jane Doe", "jane.doe@example.com");

        $users = $this->userManager->getUsers();

        $this->assertCount(2, $users);
        $this->assertEquals("John Doe", $users[0]['name']);
        $this->assertEquals("jane.doe@example.com", $users[1]['email']);
    }

    public function testInvalidUpdateThrowsException(): void
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Utilisateur introuvable.");

        $this->userManager->updateUser(999, "Fake User", "fake.email@example.com");
    }

    public function testInvalidDeleteThrowsException(): void
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Utilisateur introuvable.");

        $this->userManager->removeUser(999);
    }
}

