package pl.karol.horyzont.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.karol.horyzont.models.User;
import pl.karol.horyzont.repository.UserRepository;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Objects;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/app")
public class AppController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String findUserCurrency(@PathVariable String userId) throws Exception {
        return userRepository.findUsersCurrency(userId);
    }

    @PatchMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void addCurrency(@PathVariable final String userId, @RequestBody User user) throws Exception {
        String userCurrency = userRepository.findUsersCurrency(userId);
        final String fieldName = "currencies";
        final Method getter = User.class.getDeclaredMethod("getCurrencies");
        final Object addedValue = getter.invoke(user);

        if (userCurrency == null) {
            final Object fieldValue = getter.invoke(user);
            System.out.println(fieldValue);
            userRepository.partialUpdate(userId, fieldName, fieldValue);
        } else if (userCurrency.contains(addedValue.toString())) {
            int index = userCurrency.indexOf(addedValue.toString());
            String firstPart = userCurrency.substring(0, index);
            String secondPart = userCurrency.substring(index + 3);
            Object fieldValue = firstPart + secondPart;
            userRepository.partialUpdate(userId, fieldName, fieldValue);
        } else {
            final Object fieldValue = userCurrency.concat(" " + addedValue.toString());
            userRepository.partialUpdate(userId, fieldName, fieldValue);
        }
    }



    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Panel Admina.";
    }
}
